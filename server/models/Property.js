
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define("Property",{
        street : {
            type : DataTypes.STRING,
        },
        city : {
            type :DataTypes.STRING
        }, 
        state : {
            type :DataTypes.STRING
        },
        zip : {
            type :DataTypes.STRING
        },
        rent : {
            type : DataTypes.INTEGER
        }
    });
    Property.associate = (models) => {
        Property.belongsTo(models.Users);
    }
    return Property;
};