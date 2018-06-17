const fs = require('fs')
const path = require('path')
const mime = require('mime')

const files = [
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 1 },
  { path: path.resolve('static/images'), name: 'test.jpg', post_id: 2 },
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 3 },
  { path: path.resolve('static/images'), name: 'test.jpg', post_id: 4 },
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 5 },
  { path: path.resolve('static/images'), name: 'test.jpg', post_id: 6 },
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 7 },
  { path: path.resolve('static/images'), name: 'test.jpg', post_id: 8 },
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 9 },
  { path: path.resolve('static/images'), name: 'test.jpg', post_id: 10 },
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 11 },
  { path: path.resolve('static/images'), name: 'test.jpg', post_id: 12 },
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 13 },
  { path: path.resolve('static/images'), name: 'test.jpg', post_id: 14 },
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 15 },
  { path: path.resolve('static/images'), name: 'test.jpg', post_id: 16 },
  { path: path.resolve('static/images'), name: 'logo.png', post_id: 17 },
]

const dummyPictures = files.map(each => {
  return {
    mime: mime.getType(each.name.split('.')[1]),
    content: fs.readFileSync(`${each.path}/${each.name}`, 'base64'),
    post_id: each.post_id, 
  }
})

module.exports = { dummyPictures }