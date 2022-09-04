const http = require("http");
const { dataUri, getData } = require("../index");

const port = 8081;
let data;

// 1. Extract base64-encoded data from the data uri
[, data] = dataUri.split(",");

// You could also get the data from an RPC endpoint
// Requires Node 18 because getData uses fetch
// (async function () {
//     [, data] = (await getData("http://127.0.0.1:8545")).split(",");
// })();

// 2. Turn base64-encoded data into a buffer
const body = Buffer.from(data, "base64");

const server = http.createServer((req, res) => {
    // 3. send the GIF as the response
    const headers = [200, { "Content-Length": body.byteLength, "Content-Type": "image/gif" }];
    res.writeHead(...headers);
    res.end(body);
    console.log("Response: ", ...headers);
});
server.listen(port);
console.log(`listening on ${port}...`);
