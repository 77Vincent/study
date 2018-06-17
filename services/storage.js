const mime = require('mime')
const uuidv1 = require('uuid/v1')

const c = require('../config')
const path = require('path')
const fs = require('fs')

module.exports = {
  store(stuff, base64, mimeType) {
    if (base64 && mimeType) {
      const where = path.resolve(`${c.fileLocation}/${stuff}s/${stuff}_${uuidv1()}.${mime.getExtension(mimeType)}`)
      fs.writeFileSync(where, new Buffer(base64, 'base64'))
      return where
    }
  },
  restore(where) {
    try {
      return fs.readFileSync(where)
    } catch (err) {
      console.error(err)
      return null
    }
  },
  remove(where) {
    try {
      fs.unlinkSync(where)
    } catch (err) {
      console.error(err)
    }
  },
}