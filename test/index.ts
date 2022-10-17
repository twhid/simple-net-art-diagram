import { expect } from "chai";
import { fetchData, abi, addresses, functionSignature, dataUri } from "../src/index";
import { dataUri as packageDataUri } from "../src/SimpleNetArtDiagramDataUri";

describe("Simple Net Art Diagram Helper Lib", () => {
    it("exports the ABI", () => {
        expect(abi).to.be.an.instanceof(Array);
        expect(abi[0].type).to.equal("constructor");
        expect(abi.find((c) => c.name === "SIMPLE_NET_ART_DIAGRAM")).to.include({
            stateMutability: "view",
            type: "function",
        });
    });

    it("exports the SIMPLE_NET_ART_DIAGRAM function sig", () => {
        expect(functionSignature).to.equal("0xea99b750");
    });

    it("exports addresses", () => {
        expect(addresses["31337"].address).to.match(/^0x[a-fA-F0-9]{40}$/);
    });

    it("exports the data URI", () => {
        expect(packageDataUri).to.equal(dataUri);
    });

    describe("Simple_Net_Art_Diagram", () => {
        it("returns dataUri from RPC", async () => {
            const data = await fetchData("http://127.0.0.1:8545", "31337");
            // smoke test to ensure the function fetches something that
            // looks similar to the correct dataUri
            expect(data).to.match(/data:image\/gif;base64,R0lGODlh1wHuAMQAAP\/\/\//);
        });
    });
});
