# The Simple Net Art Diagram

![Simple Net Art Diagram](/netartdiagram.gif)

> Created by artist duo MTAA, Simple Net Art Diagram (SNAD) is a schematic illustration of two computer terminals connected by a line and a red lightning bolt labeled “The art happens here.” Through an extreme economy of form, the now-iconic image conveys complex concepts about net art: first, that it “happens,” and therefore can be thought of as an action or a performance; and second, that it is defined by in-betweenness.

> Since its publication in the late 1990s, Simple Net Art Diagram has functioned as a kind of net art meme, remade by other artists to reflect differing conceptions of net art. Embracing this evolution, MTAA have released it under a Creative Commons license that permits alteration and reuse.

&mdash; [Rhizome's Net Art Anthology](https://anthology.rhizome.org/simple-net-art-diagram)

## NFT

MTAA will deploy a smart contract to the Ethereum blockchain which embeds a base64-encoded representation of The Simple Net Art Diagram within its source code. This contract follows the [ERC-721](https://eips.ethereum.org/EIPS/eip-721) standard.

### Addresses
The contract has not been deployed yet.

### NFT Edition
The artists will mint three non-fungible tokens of The Simple Net Art Diagram. These tokens will be entirely on the Ethereum blockchain with no external dependencies such as IPFS or Arweave. See the [contracts](/contracts/) section of this repo for the source code.

### Usage
#### smart contract
The smart contract exposes two functions that may be used to render The Simple Net Art Diagram directly from the blockchian. 

* `SIMPLE_NET_ART_DIAGRAM` &mdash; returns a base64-encoded data URI (the signature is `0xea99b750`)
* `tokenURI` returns base64-encoded ERC-721 compliant metadata JSON, with the a data uri in the `image` field

#### npm package

**Install**

`yarn add simple-net-art-diagram`

Require in Node.js:
```js
const SimpleNetArtDiagram = require("simple-net-art-diagram");
```
or, in the browser, which adds a `SimpleNetArtDiagram` global variable.
```html
<script src='./node_modules/simple-net-art-diagram/index.js'></script>
```
Note: We're not providing a CDN URL for the package.

The smart contract ABI, addresses, `SIMPLE_NET_ART_DIAGRAM` function signature, and the data URI are available via properties on the exported object:
```js
SimpleNetArtDiagram.abi; // [{"inputs": [],"stateMutability": "nonpayable",}...etc.
SimpleNetArtDiagram.addresses; // { "31337": { "address": "0x5FbDB2313...etc"
SimpleNetArtDiagram.functionSignature; // 0xea99b750
SimpleNetArtDiagram.dataUri; // "data:image/gif;base64,R0lGODlh1wHuAMQAAP///...etc
```
`addresses.json` is an object with chain IDs as keys:
```json
{
    "<chain id>": {
        "address": "<contract address>",
        "transactionHash": "<deploy transaction hash>"
    },
    // etc
}
```
There is also a helper function exported which helps to retrieve the data URI directly from the blockchain.

```ts
SimpleNetArtDiagram.getData(rpcEndpoint: string): Promise<string>

// example
(async function () {
    const rpcEndpoint = "http://127.0.0.1:8545";
    const img = new Image();
    img.src = await SimpleNetArtDiagram.getData(rpcEndpoint);
    body.appendChild(img);
})();
```
See the [examples](./examples/) directory for more.

## Other formats
Find other formats of The Simple Net Art Diagram on IPFS
* [GIF (CID: Qmdd32V1TCULHoomWaC5mKpY46CpYMG3JwskGy32S9BSRE)](https://gateway.pinata.cloud/ipfs/Qmdd32V1TCULHoomWaC5mKpY46CpYMG3JwskGy32S9BSRE)
* [SVG (CID: Qmc3EJTCrXSxU5oRrx8zr7zkbugiZdAkbpxnu8QoDB1MB6)](https://gateway.pinata.cloud/ipfs/Qmc3EJTCrXSxU5oRrx8zr7zkbugiZdAkbpxnu8QoDB1MB6)
* [PDF (CID: QmejeawqoTqZGN8sEk6ruJAj7aLuWkvZmkHMoK1TZ2y3Vz)](https://gateway.pinata.cloud/ipfs/QmejeawqoTqZGN8sEk6ruJAj7aLuWkvZmkHMoK1TZ2y3Vz)
