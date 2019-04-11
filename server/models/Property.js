'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    id : { type : DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
        },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    rent: DataTypes.INTEGER,
    user_id: DataTypes.UUID
  },  {freezeTableName: true});
  Property.associate = function(models) {
    Property.belongsTo(models.User, { foreignKey : 'user_id', targetKey:'id'});
  };
  return Property;
};