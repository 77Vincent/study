'use strict'

import Sequelize from 'sequelize'
import sequelize from '../utili/database.js'

const Major = sequelize.define('major', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  desc: {
    type: Sequelize.STRING,
  }
}, {
  tableName: 'Major'
})

export default Major