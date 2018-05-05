const fs = require('fs')
const path = require('path')
const mime = require('mime')

const files = [
  { path: path.resolve('static/images'), name: 'logo.png', user_id: 2 },
  { path: path.resolve('static/images'), name: 'logo.png', user_id: 3 },
]

const dummyAvatars = files.map(each => {
  return {
    mime: mime.getType(each.name.split('.')[1]),
    content: fs.readFileSync(`${each.path}/${each.name}`, 'base64'),
    user_id: each.user_id 
  }
})

module.exports = { dummyAvatars }