const AppChain = require('../lib');
const SERVER = 'https://node.cryptape.com';
const appchain = AppChain.default(SERVER);
module.exports = appchain;
