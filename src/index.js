import addresses from "../addresses.json";
import SNAD from "../SimpleNetArtDiagram.json";
import { Simple_Net_Art_Diagram_dataUri } from "../SimpleNetArtDiagramDataUri";

const SIMPLE_NET_ART_DIAGRAM_fn = "0xea99b750";
let data = null;

async function getData(rpcEndpoint) {
    if (!rpcEndpoint) {
        throw new Error(`SimpleNetArtDiagram: Must pass an RPC endpoint`);
    }

    if (typeof fetch === 'undefined') {
        throw new Error(`SimpleNetArtDiagram: fetch must by polyfilled`);
    }

    if (data) {
        // don't fetch data if we already have it
        return data;
    }

    const res = await fetch(rpcEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_call",
            params: [
                {
                    to: addresses["31337"].address,
                    data: SIMPLE_NET_ART_DIAGRAM_fn
                },
                "latest",
            ],
            id: 67,
        }),
    });
    if (res.ok) {
        const json = await res.json();
        const hexBytes = json.result.slice(2); // remove 0x
        // convert to bytes, then remove padding
        // see https://ethereum.stackexchange.com/questions/83576/json-rpc-hex-string-weird-padding-encoding
        const bytes = hexStringToByteArray(hexBytes).slice(64);
        // back to dataUri
        data = String.fromCharCode(...bytes);
        return data;
    } else {
        console.error(`SimpleNetArtDiagram: RPC response error: `, res.status, res.statusText);
        return null;
    }
}

function hexStringToByteArray(str) {
    if (!str) {
        return new Uint8Array();
    }
    const a = [];
    for (let i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16));
    }
    return new Uint8Array(a);
}

const abi = SNAD.abi;
export {
    abi,
    addresses,
    getData,
    Simple_Net_Art_Diagram_dataUri as dataUri,
    SIMPLE_NET_ART_DIAGRAM_fn as functionSignature,
};
