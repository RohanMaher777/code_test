const { DataTypes } = require('sequelize')
const sequelize = require('../dbConfig');
const Message = sequelize.define("Message",{
    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    message : {
        type : DataTypes.STRING,
        allowNull : false
    },
    senderId : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    receiverId : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
})
Message.sync({ alter : true })
module.exports = Message;
