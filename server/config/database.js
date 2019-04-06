const config = require('./config');
const Sequelize = require('sequelize');
const _ = require('lodash');
const Faker = require('faker');
const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password,{
    host: config.db.host,
    dialect : config.db.dialect
});

const models = {
    Users : sequelize.import('../models/Users.js'),
    Property : sequelize.import('../models/Property.js')
}

Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]){
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
sequelize.sync().then(() => {

    _.times(10, () =>{
        return models.Users.create({
            firstName : Faker.name.firstName(),
            lastName : Faker.name.lastName()
        }).then(user => {
            _.times(Faker.random.number({min : 1, max : 4}),()=>{
                return user.createProperty({
                    street : Faker.address.streetAddress(),
                    city : Faker.address.city(),
                    state : Faker.address.stateAbbr(),
                    zip : Faker.address.zipCode(),
                    rent : Math.round(Faker.random.number({ min : 3000, max : 10000})/1000)*1000
                });
            });
        });
    });

});
models.Sequelize = Sequelize;
module.exports = models;
