const { makeExecutableSchema } = require('graphql-tools');
const GraphQLJson = require('graphql-type-json');
const RootQuery = require('./rootQuery');
const RootMutation = require('./rootMutation');
const JobCounts = require('./jobCountsType');
const PaginatedJobs = require('./paginatedJobsType');
const PageInfo = require('./pageInfoType');
const Job = require('./jobType');
const Queue = require('./queueType');
const RedisStats = require('./redisStatsType');

const schema = `
  scalar Json

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const resolvers = {
  RootQuery: RootQuery.resolvers,
  RootMutation: RootMutation.resolvers,
  Job: Job.resolvers,
  Queue: Queue.resolvers,
  Json: GraphQLJson,
};

const typeDefs = [
  schema,
  RootQuery.typedef,
  RootMutation.typedef,
  JobCounts.typedef,
  PaginatedJobs.typedef,
  PageInfo.typedef,
  Job.typedef,
  Queue.typedef,
  RedisStats.typedef,
];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
