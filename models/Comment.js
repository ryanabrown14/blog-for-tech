const {Sequelize, Model, Datatypes} = require('sequelize');

class Comment extends Model{}

Comment.init(
    {
        body:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize
    }
);

module.exports = Comment;