const fs = require('fs')
const path = require('path')
const mime = require('mime')

const filePath = path.resolve('static/resources/images')
const files = [
  { path: filePath, name: 'avatar-1.jpg' },
  { path: filePath, name: 'avatar-2.jpg' },
  { path: filePath, name: 'avatar-3.jpg' },
  { path: filePath, name: 'avatar-4.jpg' },
]

module.exports = files.map(each => ({
  mime: mime.getType(each.name.split('.')[1]),
  content: fs.readFileSync(`${each.path}/${each.name}`, 'base64'),
}))
