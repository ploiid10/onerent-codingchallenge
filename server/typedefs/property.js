const { GraphQLObjectType ,GraphQLInt,GraphQLString} = require('graphql');
const User  = require('./user');
const Property = new GraphQLObjectType({
    name : 'Property',
    description : 'This is a property',
    fields: ()=> {
        return  {
            id : {type : GraphQLInt,
                resolve(Property){
                    return Property.id;
                 }
            },
            street : {type : GraphQLString,
                resolve(Property){
                    return Property.street;
                 }
            },
            city : {type : GraphQLString,
                resolve(Property){
                    return Property.city;
                 }
            },
            state : { type : GraphQLString,
                resolve(Property){
                    return Property.state;
                 }
            },
            zip : { type : GraphQLString,
                resolve(Property){
                    return Property.zip;
                 }
            },
            rent : { type : GraphQLInt,
                resolve(Property){
                    return Property.rent;
                 }
            },
            user : { type : User,
                resolve(Property){
                    return Property.getUser();
                }
            }
    }
}
});
module.exports = Property;