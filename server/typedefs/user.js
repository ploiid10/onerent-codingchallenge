const { GraphQLObjectType ,GraphQLString} = require('graphql');
const User = new GraphQLObjectType({
    name : 'User',
    description : 'User details',
    fields: {
        firstName : {type : GraphQLString,
            resolve(User){
                return User.firstName;
            }
        },
        lastName : {type : GraphQLString,
            resolve(User){
                return User.lastName;
            }
        }
 
    }
});
module.exports = User;