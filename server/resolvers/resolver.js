const db = require('../models/index');
const { GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require('graphql');
const Property  = require('../typedefs/property');
const Op = db.Sequelize.Op;
module.exports = new GraphQLObjectType({
    name : 'search',
    fields :  () =>{
        return {
            property : {
                type : new GraphQLList(Property),
                args : {
                    offset :{type : GraphQLInt},
                    limit :{type : GraphQLInt},
                    stringSearch : {type : GraphQLString}
                },
                resolve(root,args){
                    const query =  (args.stringSearch) ? { offset: args.offset, limit : args.limit,
                        where : { [Op.or] : [{ street : {[Op.eq] : args.stringSearch} }, 
                        {zip : {[Op.eq] : args.stringSearch}}, 
                        {city : {[Op.eq] : args.stringSearch}}, 
                        {state : {[Op.eq] : args.stringSearch}}, 
                        {rent : {[Op.eq] : Number.isInteger(+args.stringSearch)? +args.stringSearch : 0}}, 
                        { '$User.firstName$' : {[Op.eq] : args.stringSearch}}, 
                        { '$User.lastName$' : {[Op.eq] : args.stringSearch}}]},
                        include: [{model : db.User, as :'User'}]
                    } : { offset: args.offset, limit : args.limit ,include: [db.User]};
                    return db.Property.findAll(query); 
                }
            }
        }
    }
});
