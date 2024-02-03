const { Sequelize } = require('sequelize')
const sequelize = new Sequelize("communication_db", "root",'', {
    host : 'localhost',
    dialect : 'mysql',
    logging : false
})

try {
    sequelize.authenticate()
    console.log(`Database connection successfully...`)
} catch (error) {
    console.log(error)
}

module.exports = sequelize;
