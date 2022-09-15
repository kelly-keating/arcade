const { hashSync } = require('bcrypt')
const saltRounds = 10

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          user_name: 'admin',
          actual_name: 'Anorak',
          hash: hashSync('admin', saltRounds)
        }
      ])
    })
}
