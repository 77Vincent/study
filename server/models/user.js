import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import { db } from '../utils'

export default db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV1,
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
  role_id: {
    type: Sequelize.STRING,
    defaultValue: 'student',
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  name: {
    type: Sequelize.STRING
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
    type: Sequelize.INTEGER
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
