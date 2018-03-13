import Sequelize from 'sequelize'
import bcryptjs from 'bcryptjs'
import { connection } from '../utili'

export default connection.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  role: {
    type: Sequelize.STRING,
    allowNull: false
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
    type: Sequelize.BOOLEAN
  },
  birthday: {
    type: Sequelize.DATE
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
  hooks: {
    afterValidate(input) {
      input.password = bcryptjs.hashSync(input.password, 8)
    }
  }
})
