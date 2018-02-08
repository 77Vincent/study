'use strict';
import sequelize from './sequelize.js';
import Sequelize from 'sequelize';

const Major = sequelize.define('major', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING,
    }
},{
    tableName: 'Major'
}
);

Major.sync(); //创建表

export default Major;