const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/business/api', { target: 'http://10.40.80.45:11180/' }))
  app.use(proxy('/face/v1/framework', { target: 'http://10.40.80.45:9241/' }))
  app.use(proxy('/p2p/get_self', { target: 'http://10.40.80.45:7600/' }))
}