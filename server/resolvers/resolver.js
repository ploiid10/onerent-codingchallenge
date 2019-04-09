const db = require('../models/index');
const { GraphQLObjectType,GraphQLList,GraphQLSchema,GraphQLString} = require('graphql');
const Property  = require('../typedefs/property');
const RootQuery = new GraphQLObjectType({
    name : 'search',
    fields :  () =>{
        return {
            property : {
                type : new GraphQLList(Property),
                args : {
                    stringSearch : {
                        type : GraphQLString
                    }
                },
                resolve(root,args){
                    return db.Property.findAll({});
                }
            }
        }
    }
});
const Schema = new GraphQLSchema({
    query : RootQuery
}); 
module.exports = Schema;