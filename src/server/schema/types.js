const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require('graphql');

const _ = require('lodash/fp');
const GraphQLJson = require('graphql-type-json');
const QueueHelpers = require('../views/helpers/queueHelpers');

const camelCase = _.mapKeys(_.camelCase);

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLID },
    data: { type: GraphQLJson },
    timestamp: { type: GraphQLInt },
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
    }
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
      type: new GraphQLList(JobType),
      args: {
        state: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const { queue } = parentValue;
        const { state } = args;
        return queue[`get${_.capitalize(state)}`]();
      }
    },
  }),
});

const QueueType = new GraphQLObjectType({
  name: 'Queue',
  fields: () => ({
    name: { type: GraphQLString },
    hostId: { type: GraphQLString },
    details: {
      type: QueueDetailsType,
      async resolve(parentValue, args, req) {
        const { name, hostId } = parentValue
        const { Queues } = req.app.locals;

        const queue = await Queues.get(name, hostId);

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
      }
    }
  }),
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    queues: {
      type: new GraphQLList(QueueType),
      resolve(parent, args, req) {
        const { Queues } = req.app.locals;
        return Queues.list();
      }
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
          queue
        };
      },
    },
  }),
})

module.exports = { RootQueryType, RootMutationType };
