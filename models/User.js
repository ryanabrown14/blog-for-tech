const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');


class User extends Model{

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks:{
            async beforeCreate(newUserData){
                newUserData.password = await bcrypt.hash(newUserData.password, 11);
                return newUserData
            },
            async beforeUpdate(updateUserData) {
                updateUserData.password = await bcrypt.hash(updateUserData.password, 11);
                return updateUserData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
);

module.exports = User;