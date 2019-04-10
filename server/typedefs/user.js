const { GraphQLObjectType ,GraphQLString} = require('graphql');
const User = new GraphQLObjectType({
    name : 'User',
    description : 'User details',
    fields: ()=> {
        return{
            firstName : {type : GraphQLString},
            lastName : {type : GraphQLString}
        }
    }
});
module.exports = User;