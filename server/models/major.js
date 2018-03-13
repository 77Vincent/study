'use strict'

import Sequelize from 'sequelize'
import { sequelize } from '../utili'

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
  }
}, {
  timestamps: false
})

export default Major