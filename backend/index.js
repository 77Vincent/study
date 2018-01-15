const express = require('express')
const app = express()

const orientation = require('./servers/orientation.js')

// Routing 
app.route('/')
  .get((req, res) => {
    res.send()
  })
  .post((req, res) => {})

app.route('/orientation')
  .get((req, res) => {
    orientation(req, res)
  })
  .post((req, res) => {
    orientation(req, res)
  })

// Run app
app.listen(8080, () => console.log('Example app listening on port 8080!'))