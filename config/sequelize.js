const Sequelize = require('sequelize')
const UserModel = require('../models/user.model')
const PostModel = require('../models/post.model')
const UserPosteModel = require('../models/userPost.model')




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

const Post = PostModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)
const UserPost = UserPosteModel(sequelize, Sequelize)



User.belongsToMany(Post, {
  through: UserPost ,
  as: 'post',
  foreignKey: 'UserUserId'
});

Post.belongsToMany(User, {
  through: UserPost,
  as: 'user',
  foreignKey: 'PostPostId'
});

// for populating user and post from join table 
UserPost.belongsTo(User)
UserPost.belongsTo(Post)


// User.belongsToMany(Post, {
//   through: "UserPosts" ,
//   as: 'post',
//   foreignKey: 'UserId'
// });

// Post.belongsToMany(User, {
//   through: "UserPosts",
//   as: 'user',
//   foreignKey: 'PostId'
// });


// const UserPost = UserPostModel(sequelize, Sequelize)

// Post.belongsTo(User)
// User.belongsToMany(Post, { through: UserPostModel, as: "PostId", unique: false })
// User.belongsTo(Post, { through: UserPostModel, unique: false })
// Post.belongsTo(User, { through: UserPostModel, unique: false })


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
  Post,
  UserPost
}