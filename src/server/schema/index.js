const graphql = require('graphql');
const query = require('./types');

const { GraphQLSchema } = graphql;
const config = { query };

module.exports = new GraphQLSchema(config);
