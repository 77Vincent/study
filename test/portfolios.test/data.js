const fs = require('fs')
const path = require('path')
const mime = require('mime')

const filePath = path.resolve('./test/portfolios.test/')
const files = [
  { path: filePath, name: 'test.pdf' },
  { path: filePath, name: 'test.pdf' },
  { path: filePath, name: 'test.pdf' },
  { path: filePath, name: 'test.pdf' },
]

module.exports = files.map(each => ({
  mime: mime.getType(each.name.split('.')[1]),
  content: fs.readFileSync(`${each.path}/${each.name}`, 'base64'),
}))
