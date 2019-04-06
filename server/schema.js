const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema} = require('graphql');
const db = require('./config/database');
const Users = new GraphQLObjectType({
    name : 'User',
    description : 'This represents a User',
    fields: () => 
         {
    return {
        id : { type : GraphQLString ,
            resolve(Users){
                return Users.id;
            }
        },
        firstName : {type : GraphQLString,
            resolve(Users){
                return Users.firstName;
            } 
            
        },
        lastName : {type : GraphQLString,
            resolve(Users){
                return Users.lastName;
    }},
    }
    }
});
const Property = new GraphQLObjectType({
    name : 'Property',
    description : 'This is a property',
    fields: () => 
    {
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
            user : { type : Users,
                resolve(Property){
                    return Property.getUser();
                }
            }
        }
    }
});
const Op = db.Sequelize.Op;
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
                 return args.stringSearch != "" ? db.Property.findAll({where : { [Op.or] : [{ street : {[Op.eq] : args.stringSearch} }, 
                    {zip : {[Op.eq] : args.stringSearch}}, {city : {[Op.eq] : args.stringSearch}}, 
                    {state : {[Op.eq] : args.stringSearch}}, {rent : {[Op.eq] : number = Number.isInteger(+args.stringSearch)? +args.stringSearch : 0}}, { '$User.firstName$' : {[Op.eq] : args.stringSearch}}, { '$User.lastName$' : {[Op.eq] : args.stringSearch}}]}, 
                    include: [{model : db.Users ,as : 'User'}],logging: console.log}) : db.Property.findAll({include: [db.Users]});
                 
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query : RootQuery
}); 
module.exports = Schema;