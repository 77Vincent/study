'use strict'

import Sequelize from 'sequelize'
import sequelize from '../base/database.js'

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
)

export default Major