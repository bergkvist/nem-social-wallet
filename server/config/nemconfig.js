
/** === Feel free to change === **/
const runningOnTestNet = true;

/** === Don't touch === **/
const nem = require('nem-sdk').default;
let networkId, url;
const port = nem.model.nodes.defaultPort;
if (runningOnTestNet) {
    networkId = nem.model.network.data.testnet.id;
    url = nem.model.nodes.defaultTestnet;
} else {
    networkId = nem.model.network.data.mainnet.id;
    url = nem.model.nodes.defaultMainnet;
}

let nemconfig = { endpoint: nem.model.objects.create('endpoint')(url, port), 
                  networkId, 
                  runningOnTestNet };

module.exports = nemconfig;
