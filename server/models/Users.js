
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        id : {
            type : DataTypes.UUID,
            primaryKey : true,
            allowNull: false,
            defaultValue : DataTypes.UUIDV4
        },
        firstName : {
            type : DataTypes.STRING,
        },
        lastName : {
            type :DataTypes.STRING
        }
        
    });
    Users.associate = (models) => {
        Users.hasMany(models.Property);
    }
    return Users;
};