const { GraphQLObjectType ,GraphQLInt,GraphQLString} = require('graphql');
const User  = require('./user');
const Property = new GraphQLObjectType({
    name : 'Property',
    description : 'This is a property',
    fields: ()=> {
        return {
            id : {type : GraphQLInt},
            street : {type : GraphQLString},
            city : {type : GraphQLString},
            state : { type : GraphQLString},
            zip : { type : GraphQLString},
            rent : { type : GraphQLInt},
            user : { type : User, resolve(Property){
                return Property.getUser();
            }
        }
    }
}
});
module.exports = Property;