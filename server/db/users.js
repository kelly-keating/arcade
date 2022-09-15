const {generatePasswordHash} = require('../auth/hash')

const connection = require('./connection')

function createUser (actual_name, user_name, password, testDb) {
  const db = testDb || connection

  return generatePasswordHash(password)
    .then(hash => {
      return db('users')
        .insert({actual_name, user_name, hash}, 'id')
    })
}

function userExists (user_name, testDb) {
  const db = testDb || connection

  return db('users')
    .where('user_name', user_name)
    .then(users => users.length > 0)
}

function getUserByUsername (user_name, testDb) {
  const db = testDb || connection

  return db('users')
    .where('user_name', user_name)
    .first()
}

module.exports = {
  createUser,
  userExists,
  getUserByUsername,
}
