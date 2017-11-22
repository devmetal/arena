const graphql = require('graphql');
const {
  RootQueryType,
  RootMutationType,
} = require('./types');

const { GraphQLSchema } = graphql;
const config = {
  query: RootQueryType,
  mutation: RootMutationType,
};

module.exports = new GraphQLSchema(config);
