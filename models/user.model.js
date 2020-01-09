
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
  const User = sequelize.define('User', {
      UserId: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      LastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
      Age: {
        type: Sequelize.STRING
        // allowNull defaults to true
      }
  });

  // User.associate = (models) => {
  //   User.belongsToMany(models.Post, {
  //     through: 'UserPost' ,
  //     as: 'post',
  //     foreignKey: 'PostId'
  //   });
  // };
  return User
}

