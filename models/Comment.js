const { db, DataTypes, Model } = require("../db/connection.js");

class Comment extends Model {};

Comment.init({
    body: DataTypes.STRING,
    createdAt: DataTypes.STRING
}, {
    sequelize: db,
    modelName: "Comment"
});

module.exports = Comment;