import addresses from "./addresses.json";
export { abi } from "./SimpleNetArtDiagram.json";
export { dataUri } from "./SimpleNetArtDiagramDataUri.js";
export { addresses };
export const functionSignature = "0xea99b750";

type ChainId = keyof typeof addresses;
let data: string | null = null;

export async function fetchData(rpcEndpoint: string, chainId: ChainId): Promise<typeof data> {
    if (!rpcEndpoint) {
        throw new Error(`SimpleNetArtDiagram: Must pass 'rpcEndpoint'`);
    }

    if (!chainId) {
        throw new Error(`SimpleNetArtDiagram: Must pass 'chainId'`);
    }

    if (typeof fetch === "undefined") {
        throw new Error(`SimpleNetArtDiagram: fetch must by polyfilled`);
    }

    if (data) {
        // don't fetch data if we already have it
        return data;
    }

    try {
        const res = await fetch(rpcEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_call",
                params: [
                    {
                        to: addresses[chainId].address,
                        data: functionSignature,
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
        } else {
            throw new Error(`SimpleNetArtDiagram: RPC response error: ${res.status}, ${res.statusText}`);
        }
    } catch (e) {
        console.error(e);
    }
    return data;
}

function hexStringToByteArray(str: string): Uint8Array {
    if (!str) {
        return new Uint8Array();
    }
    const a = [];
    for (let i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16));
    }
    return new Uint8Array(a);
}
