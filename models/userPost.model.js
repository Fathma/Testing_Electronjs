
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
  return sequelize.define('UserPosts', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  })
}


