import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import { Db } from '../utils'

export default Db.define('user', {
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
  available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  gender: {
    type: Sequelize.BOOLEAN
  },
  name: {
    type: Sequelize.STRING
  },
  avatar_url: {
    type: Sequelize.STRING
  },
  school: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  province: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  place: {
    type: Sequelize.STRING,
    defaultValue: 'both',
  },
  country: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.TEXT
  },
  cost: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
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
