import { expect } from "chai";
import { abi, functionSignature, addresses, dataUri } from "../src/index";
import { Simple_Net_Art_Diagram_dataUri } from "../SimpleNetArtDiagramDataUri";

describe("Simple Net Art Diagram Helper Lib", () => {
    it("exports the ABI", () => {
        expect(abi).to.be.an.instanceof(Array);
        expect(abi[0].type).to.equal("constructor");
    });

    it("exports the SIMPLE_NET_ART_DIAGRAM function sig", () => {
        expect(functionSignature).to.equal("0xea99b750");
    });

    it("exports addresses", () => {
        expect(addresses["31337"].address).to.not.be.undefined;
    });

    it("exports the data URI", () => {
        expect(dataUri).to.equal(Simple_Net_Art_Diagram_dataUri);
    });
});
