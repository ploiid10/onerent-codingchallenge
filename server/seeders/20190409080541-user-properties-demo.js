'use strict';
const uuidv4  = require('uuid/v4');
const Faker = require('faker');
const _ = require('lodash');
module.exports = {
  up:  (queryInterface, Sequelize) => {
    let users = [];
    _.times(10,()=>{
      users.push({
        id : uuidv4(),
        firstName : Faker.name.firstName(),
        lastName : Faker.name.lastName(),
        createdAt : new Date(),
        updatedAt : new Date()
      });
    });
   queryInterface.bulkInsert('User',users, {});
   let index = 0;
   let properties = [];
   _.times(10,()=>{
      _.times(Faker.random.number({min : 1, max : 3}), () =>{
        properties.push({
          id : uuidv4(),
          street : Faker.address.streetAddress(),
          city : Faker.address.city(),
          state : Faker.address.stateAbbr(),
          zip : Faker.address.zipCode(),
          rent : Math.round(Faker.random.number({ min : 3000, max : 10000})/1000)*1000,
          user_id : users[index].id,
          createdAt : new Date(),
          updatedAt : new Date()
       });
      });
      index++;
   });
  return queryInterface.bulkInsert('Property', properties, {});
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Property', null, {});
      return queryInterface.bulkDelete('Users', null, {});
  }
};
