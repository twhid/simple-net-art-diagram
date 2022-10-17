import addresses from "./addresses.json";
export { abi } from "./SimpleNetArtDiagram.json";
export { dataUri } from "./SimpleNetArtDiagramDataUri.js";
export { addresses };
export declare const functionSignature = "0xea99b750";
declare type ChainId = keyof typeof addresses;
declare let data: string | null;
export declare function fetchData(rpcEndpoint: string, chainId: ChainId): Promise<typeof data>;
