const CITASDK = require('../lib')
const SERVER = 'ws://node.staging.cryptape.com'
const citaSDK = CITASDK.default(SERVER)
module.exports = citaSDK
