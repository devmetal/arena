const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const GraphQLJson = require('graphql-type-json');

const _ = require('lodash/fp');
const range = require('lodash/range');
const last = require('lodash/last');
const ceil = require('lodash/ceil');
const QueueHelpers = require('../views/helpers/queueHelpers');

const camelCase = _.mapKeys(_.camelCase);

const PageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  fields: () => ({
    currentPage: { type: GraphQLInt },
    itemsPerPage: { type: GraphQLInt },
    pages: { type: new GraphQLList(GraphQLInt) },
  }),
});

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLID },
    data: { type: GraphQLJson },
    timestamp: { type: GraphQLString },
    attemptsMade: { type: GraphQLInt },
    returnvalue: { type: GraphQLJson },
    stacktrace: { type: GraphQLJson },
    failedReason: { type: GraphQLString },
    progress: {
      type: GraphQLInt,
      resolve(parentValue) {
        return parentValue._progress;
      },
    },
    state: {
      type: GraphQLString,
      async resolve(parentValue) {
        return parentValue.getState();
      },
    },
  }),
});

const PaginatedJobType = new GraphQLObjectType({
  name: 'PaginatedJobs',
  fields: () => ({
    pageInfo: {
      type: PageInfoType,
    },
    edges: {
      type: new GraphQLList(JobType),
    },
  }),
});

const JobCountsType = new GraphQLObjectType({
  name: 'JobCounts',
  fields: () => ({
    waiting: { type: GraphQLInt },
    active: { type: GraphQLInt },
    completed: { type: GraphQLInt },
    failed: { type: GraphQLInt },
    delayed: { type: GraphQLInt },
  }),
});

const RedisStatsType = new GraphQLObjectType({
  name: 'RedisStats',
  fields: () => ({
    redisVersion: { type: GraphQLString },
    totalSystemMemory: { type: GraphQLString },
    usedMemory: { type: GraphQLString },
    memFragmentationRatio: { type: GraphQLString },
    connectedClients: { type: GraphQLString },
    blockedClients: { type: GraphQLString },
  }),
});

const QueueDetailsType = new GraphQLObjectType({
  name: 'QueueDetails',
  fields: () => ({
    jobCounts: { type: JobCountsType },
    redisStats: { type: RedisStatsType },
    jobList: {
      type: PaginatedJobType,
      args: {
        state: { type: new GraphQLNonNull(GraphQLString) },
        currentPage: { type: new GraphQLNonNull(GraphQLInt) },
        itemsPerPage: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parentValue, args) {
        const { queue } = parentValue;
        const {
          currentPage,
          itemsPerPage,
          state,
        } = args;

        const startId = (currentPage - 1) * itemsPerPage;
        const endId = (startId + itemsPerPage) - 1;

        const jobCounts = await queue.getJobCounts();
        const edges = await queue[`get${_.capitalize(state)}`](startId, endId);

        let pages = range(currentPage - 6, currentPage + 7)
          .filter(page => page >= 1);

        while (pages.length < 12) {
          pages.push(last(pages) + 1);
        }

        pages = pages.filter(page => page <= ceil(jobCounts[state] / itemsPerPage));

        const pageInfo = {
          currentPage,
          itemsPerPage,
          pages,
        };

        return { pageInfo, edges };
      },
    },
  }),
});

const QueueType = new GraphQLObjectType({
  name: 'Queue',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve({ name, hostId }) {
        return `${name}:${hostId}`;
      },
    },
    name: { type: GraphQLString },
    hostId: { type: GraphQLString },
    details: {
      type: QueueDetailsType,
      async resolve(parentValue) {
        const { queue } = parentValue;

        if (!queue) {
          return null;
        }

        const jobCounts = await queue.getJobCounts();
        const redisStats = await QueueHelpers.getStats(queue);

        return {
          queue,
          jobCounts,
          redisStats: camelCase(redisStats),
        };
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    addJob: {
      type: JobType,
      args: {
        queueName: { type: GraphQLString },
        hostId: { type: GraphQLString },
        data: { type: GraphQLJson },
      },
      async resolve(parent, args, req) {
        const { queueName, hostId, data } = args;
        const { Queues } = req.app.locals;
        const queue = await Queues.get(queueName, hostId);

        return queue.add(data);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    queues: {
      type: new GraphQLList(QueueType),
      async resolve(parent, args, { request }) {
        const { Queues } = request.app.locals;
        const queuesList = Queues.list();

        return Promise.all(queuesList.map((q) => {
          const { name, hostId } = q;
          return Promise.all([q, Queues.get(name, hostId)]);
        }))
          .then((queues) => {
            return queues.map(([queueDatas, queue]) => ({
              ...queueDatas,
              queue,
            }));
          });
      },
    },
    queue: {
      type: QueueType,
      args: {
        name: { type: GraphQLString },
        hostId: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        const { name, hostId } = args;
        const { Queues } = req.app.locals;
        const queue = await Queues.get(name, hostId);

        if (!queue) {
          return null;
        }

        return {
          name,
          hostId,
          queue,
        };
      },
    },
  }),
});

module.exports = { RootQueryType, RootMutationType };
