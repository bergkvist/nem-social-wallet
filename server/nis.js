const http = require('http');
const root = 'http://82.196.9.187:7890';
const url = path => `${root}${path}`;

const GET = http.get;
const POST = http.post;

function api(requestFunction, path, object) {
    return new Promise((resolve, reject) => {

        let httpRequest = requestFunction.bind(this, url(path));
        if (requestFunction === POST) httpRequest = request.bind(object);

        httpRequest(response => {
            let buffer = "";

            response.on('data', chunk => {
                buffer += chunk
            });

            response.on('end', error => {
                if (error) reject(error);
    
                const data = JSON.parse(buffer);
                resolve(data);
            });
        })
    });
}

let nis = {};
nis.get = {
    status: async () => api(GET, `/status`),
    account: async address => api(GET, `/account/get?address=${address}`)
};
nis.post = {
    announceTx: async signedTx => api(POST, `/transaction/announce`, signedTx)
}

module.exports = nis;
