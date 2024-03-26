const Sequelize = require('sequelize')
const sequelize = new Sequelize('bdpostgres', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost'
})

module.exports = sequelize;