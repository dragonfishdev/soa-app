const userAuth = require('./user-auth.middleware');
const permit = require('./role.middleware');

module.exports = {
  userAuth, permit
}