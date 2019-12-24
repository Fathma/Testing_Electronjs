
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('User', {
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
    })
}

