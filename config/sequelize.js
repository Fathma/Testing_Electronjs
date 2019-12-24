const Sequelize = require('sequelize')
const UserModel = require('../models/user.model')
const PostModel = require('../models/post.model')


const sequelize = new Sequelize( 'database.sqlite', 'root', '', {
  dialect: 'sqlite',
  storage: './database.sqlite',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
} )

const User = UserModel(sequelize, Sequelize)
const Post = PostModel(sequelize, Sequelize)
Post.belongsTo(User, { foreignKey: 'UserUserId' } )
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// const BlogTag = sequelize.define('blog_tag', {})
// const Blog = BlogModel(sequelize, Sequelize)
// const Tag = TagModel(sequelize, Sequelize)

// Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
// Blog.belongsTo(User);

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Post
}