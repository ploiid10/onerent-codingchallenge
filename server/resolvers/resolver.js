const db = require('../models/index');
const { GraphQLObjectType,GraphQLList,GraphQLSchema,GraphQLString} = require('graphql');
const Property  = require('../typedefs/property');
module.exports = new GraphQLObjectType({
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
                    return  args.stringSearch!="" ? db.Property.findAll({where : {street: args.stringSearch}, include: [db.User]}) : db.Property.findAll({ include: [db.User]}); 
                }
            }
        }
    }
});
