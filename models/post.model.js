
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Post', {
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
}

