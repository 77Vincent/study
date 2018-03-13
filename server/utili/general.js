'use strict'

const prettyJSON = (json) => {
  return JSON.stringify(json, null, 2)
}

export {
  prettyJSON
}