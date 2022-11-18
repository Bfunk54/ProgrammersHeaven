const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

User.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

User.belongsTo(Comments, {
  foreignKey: 'user_id'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
});

Posts.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Posts, Comments };
