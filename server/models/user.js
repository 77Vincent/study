import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import { db } from '../utili'

export default db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  mobilephone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  certified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: Sequelize.ENUM,
    values: ['teacher', 'student', 'admin'],
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  name: {
    type: Sequelize.STRING(12)
  },
  avatar: {
    type: Sequelize.STRING
  },
  school: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.BOOLEAN
  },
  email: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.TEXT
  },
  last_logout: {
    type: Sequelize.DATE
  },
}, {
  paranoid: true,
  hooks: {
    afterValidate(input) {
      input.password = bcrypt.hashSync(input.password, 8)
    }
  }
})
