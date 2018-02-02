'use strict';
const sequelize = require('./sequelize.js');
const Sequelize = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

User.sync(); //创建表

module.exports = User;