const pgp = require('pg-promise')()

const connection = process.env.NODE_ENV === 'test' ? 'postgres:///todolist_test' : 'postgres:///todolist'

const db = pgp(connection)

module.exports = db
