const db = require('../models/index');
const { GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require('graphql');
const { connectionFromPromisedArray} = require('graphql-relay');
const ProperyConnection = require('../connections/property');

const Op = db.Sequelize.Op;
module.exports = new GraphQLObjectType({
    name : 'search',
    fields :  () =>{
        return {

            propertyInfo : {
                type : ProperyConnection,
                args : { after: { type: GraphQLString },
                    first: { type: GraphQLInt },
                    before: { type: GraphQLString },
                    last: { type: GraphQLInt } ,
                    stringSearch : { type : GraphQLString}
                },

                resolve : (root, args) =>{
                    const query =  (args.stringSearch) ? {where : { [Op.or] : [{ street : {[Op.eq] : args.stringSearch}}, 
                        {zip : {[Op.eq] : args.stringSearch}}, 
                        {city : {[Op.eq] : args.stringSearch}}, 
                        {state : {[Op.eq] : args.stringSearch}}, 
                        {rent : {[Op.eq] : Number.isInteger(+args.stringSearch)? +args.stringSearch : 0}}, 
                        { '$User.firstName$' : {[Op.eq] : args.stringSearch}}, 
                        { '$User.lastName$' : {[Op.eq] : args.stringSearch}}]},
                        include: [{model : db.User, as :'User'}]
                    } : {include: [db.User]};

                    const property =  db.Property.findAll(query);
                    
                    return connectionFromPromisedArray( property, args);
                }
            }
        }
    }
});
