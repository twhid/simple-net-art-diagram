const http = require("http");
const Simple_Net_Art_Diagram = require("../dist/index");
const port = 8081;
let data;

// 1. Load base64-encoded data from JSON-RPC node
// (Requires Node 18 because fetchData uses fetch.)
(async function () {
    [, data] = (await Simple_Net_Art_Diagram.fetchData("http://127.0.0.1:8545", "31337")).split(",");
})();

// The data URI is also included in the npm package;
// tests ensure the on-chain data URI and this package's
// data URI are identical.
//[, data] = Simple_Net_Art_Diagram.dataUri.split(",");

const server = http.createServer((req, res) => {
    // 2. Turn base64-encoded data into a buffer
    const body = Buffer.from(data, "base64");
    // 3. send the GIF as the response
    const headers = [200, { "Content-Length": body.byteLength, "Content-Type": "image/gif" }];
    res.writeHead(...headers);
    res.end(body);
    console.log("Response: ", ...headers);
});
server.listen(port);
console.log(`listening on ${port}...`);
