const fs = require('fs')
const path = require('path')
const mime = require('mime')

const files = [
  { path: path.resolve('static/images'), name: 'logo.png' },
  { path: path.resolve('static/images'), name: 'logo.png' },
  { path: path.resolve('static/images'), name: 'test.jpg' }
]

module.exports = files.map(each => {
  return {
    mime: mime.getType(each.name.split('.')[1]),
    content: fs.readFileSync(`${each.path}/${each.name}`, 'base64'),
  }
})
