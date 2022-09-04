# Example Usage

Loading images directly from the Ethereum blockchain is a bit more complicated than loading them via an HTTP server. Therefore, we've provied a helper JS library to make it simpler to load The Simple Net Art Diagram directly from the blockchain using the JSON-RPC interface that all execution clients implement.

See the root [readme](../README.md) for documentation of the library.

Requirements to run these examples:
* Node.js 18 installed
* run `yarn install` in the root of this repo

Deploy the SimpleNetArtDiagram contract locally and rebuild the JS helper
1. In one terminal window run `yarn hardhat node`
2. In another terminal run `yarn deploy:local`
3. In the same terminal, rebuild the JS helper to get the new address for the contact: `yarn build`

Then, run `npx http-server` in the same terminal from the root of this repo. 

Load http://127.0.0.1:8080/examples/ in your web browser to see the examples.

For the server example to work, in another terminal window, run `node examples/node-server.js`. Reminder, you must use Node.js 18 to run the server because the example uses `fetch`.
