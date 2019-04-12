'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type : DataTypes.UUID,
      primaryKey : true,
      allowNull: false,
      defaultValue : DataTypes.UUIDV4
      },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {freezeTableName: true});
  
  User.associate = function(models) {
    User.hasMany(models.Property,{ foreignKey : 'id', sourceKey : 'id'});
  };
  
  return User;
};