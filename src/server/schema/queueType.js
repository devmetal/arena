const RedisStats = require('./redisStatsType');
const JobCounts = require('./jobCountsType');
const PaginatedJobs = require('./paginatedJobsType');
const QueueHelpers = require('../views/helpers/queueHelpers');
const _ = require('lodash/fp');
const range = require('lodash/range');
const last = require('lodash/last');
const ceil = require('lodash/ceil');

const camelCaseKeys = _.mapKeys(_.camelCase);

const Queue = `
  type Queue {
    id: ID!
    name: String!
    hostId: String!
    jobCounts: JobCounts
    redisStats: RedisStats
    jobs(
      state: String!,
      currentPage: Int!,
      itemsPerPage: Int!
    ): PaginatedJobs
  }
`;

module.exports.typedef = () =>
  [Queue, JobCounts.typedef, RedisStats.typedef, PaginatedJobs.typedef];

module.exports.resolvers = {
  id({ name, hostId }) {
    return `${name}:${hostId}`;
  },
  async jobCounts({ queue }) {
    return queue.getJobCounts();
  },
  async redisStats({ queue }) {
    const stats = await QueueHelpers.getStats(queue);
    return camelCaseKeys(stats);
  },
  async jobs({ queue }, args) {
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
};
