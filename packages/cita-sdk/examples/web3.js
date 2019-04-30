const { server } = require('./config')
const CITASDK = require('../lib')
const citaSDK = CITASDK.default(server)
module.exports = citaSDK
