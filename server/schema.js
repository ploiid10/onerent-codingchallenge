const query = require('./resolvers/resolver');
const {GraphQLSchema} = require('graphql');
const Schema = new GraphQLSchema({
    query : query
}); 
module.exports = Schema;