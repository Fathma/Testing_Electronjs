
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    const Post =  sequelize.define('Post', {
        PostId: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        body: {
          type: Sequelize.STRING,
          allowNull: false
        }
    })
    // Post.associate = (models) => {
    //   Post.belongsToMany(models.User, {
    //     through: 'UserPost',
    //     as: 'user',
    //     foreignKey: 'UserId'
    //   });
    // };
    return Post
}

