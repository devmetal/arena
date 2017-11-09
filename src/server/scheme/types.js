const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require('graphql');

const JobType = new GraphQLObjectType({

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
})

const QueueDetailType = new GraphQLObjectType({
  name: 'QueueDetails',
  fields: () => ({
    jobsCount: { type: JobCountsType },
    redisStats: { type: GraphQLObjectType },
    jobList: { type: GraphQLString },
  }),
})

const QueueType = new GraphQLObjectType({
  name: 'Queue',
  fields: () => ({
    name: { type: GraphQLString },
    host: { type: GraphQLString },
    hostId: { type: GraphQLString },
    details: { type: QueueDetailType },
  }),
});
