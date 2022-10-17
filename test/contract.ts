import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { dataUri } from "../src/SimpleNetArtDiagramDataUri.js";
import { snadTestFixture } from "./snadTestFixture";

type Metadata = {
    image: string;
    name: string;
    description: string;
    license: string;
    edition: string;
    attributes: Attribute[];
};

type Attribute = {
    trait_type: string;
    value: string;
};

describe("Simple Net Art Diagram", () => {
    it("mints tokens with mintMax", async () => {
        const { mintMax, snad, tokenContractOwner } = await loadFixture(snadTestFixture);
        const { events = [] } = await mintMax();
        expect(events.length).to.equal(3); // 3 transfer events in the receipt
        for (let i = 0; i < events.length; i++) {
            const tokenId = i + 1;
            expect(events?.[i]?.args?.tokenId).to.equal(tokenId);
            expect(await snad.ownerOf(tokenId)).to.equal(await tokenContractOwner.getAddress());
        }
    });

    it("will only allow owner to mint with mintMax", async () => {
        const { mintMax, otherSigner } = await loadFixture(snadTestFixture);
        await expect(mintMax(otherSigner)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("can only mint once with mintMax", async () => {
        const { mintMax } = await loadFixture(snadTestFixture);
        await mintMax();
        await expect(mintMax()).to.be.revertedWith("Already minted");
    });

    it("returns IERC721Metadata function values", async () => {
        const { snad } = await loadFixture(snadTestFixture);
        expect(await snad.name()).to.equal("Simple Net Art Diagram");
        expect(await snad.symbol()).to.equal("SNAD");
    });

    it("returns values from totalSupply function", async () => {
        const { mintMax, snad } = await loadFixture(snadTestFixture);
        expect(0).to.equal(await snad.totalSupply());
        await mintMax();
        expect(3).to.equal(await snad.totalSupply());
    });

    it("returns public constant values & metadata", async () => {
        const { mintMax, snad } = await loadFixture(snadTestFixture);
        // need to mint tokens prior to calling tokenURI or it will revert
        await mintMax();
        const totalSupply = (await snad.totalSupply()).toNumber();
        expect(3).to.equal(totalSupply);

        for (let i = 1; i <= totalSupply; i++) {
            const tokenUri = await snad.tokenURI(i);
            // edition number is written into the metadata in a few places
            const edition = `${i}/3`;
            const base64EncodedMetadata = tokenUri.split(",")[1];
            const metadataStr = Buffer.from(base64EncodedMetadata, "base64").toString("utf8");
            const metadata: Metadata = JSON.parse(metadataStr);
            const artistTrait = metadata.attributes.find((a) => a.trait_type === "Artist");
            const editionTrait = metadata.attributes.find((a) => a.trait_type === "Edition");
            const licenseTrait = metadata.attributes.find((a) => a.trait_type === "License");
            const license = `${await snad.getLicenseName()} ${await snad.getLicenseURI()}`;

            expect(metadata.name).to.equal(`${await snad.NAME()} #${edition}`);
            expect(metadata.description).to.equal(await snad.DESCRIPTION());
            expect(metadata.image).to.equal(await snad.SIMPLE_NET_ART_DIAGRAM());
            expect(metadata.license).to.equal(license);
            expect(metadata.edition).to.equal(edition);
            expect(artistTrait?.value).to.equal("MTAA");
            expect(editionTrait?.value).to.equal(edition);
            expect(licenseTrait?.value).to.equal(license);
        }
    });

    it("reverts if invalid token ID passed", async () => {
        const { mintMax, snad } = await loadFixture(snadTestFixture);
        // mint tokens to create valid token IDs
        await mintMax();
        // and then expect invalid token IDs to revert
        await expect(snad.tokenURI(0)).to.be.revertedWith("ERC721: invalid token ID");
        await expect(snad.tokenURI((await snad.totalSupply()).add(1))).to.be.revertedWith(
            "ERC721: invalid token ID"
        );
    });

    it("transfers tokens", async () => {
        const { mintMax, snad, tokenContractOwner, otherSigner } = await loadFixture(
            snadTestFixture
        );
        await mintMax();
        const from = await tokenContractOwner.getAddress();
        const to = await otherSigner.getAddress();
        // this is testing OZ contracts but wanted to exercise it
        // for my own piece of mind
        const safeTransferFrom =
            snad.connect(tokenContractOwner)["safeTransferFrom(address,address,uint256)"];
        await safeTransferFrom(from, to, 1);
        expect(await snad.ownerOf(1)).to.equal(to);
    });

    it("burns tokens", async () => {
        const { mintMax, snad, tokenContractOwner } = await loadFixture(snadTestFixture);
        await mintMax();
        await snad.connect(tokenContractOwner).burn(2);
        await expect(snad.ownerOf(2)).to.be.revertedWith("ERC721: invalid token ID");
        expect(2).to.equal(await snad.totalSupply());
        // burn the rest
        await snad.connect(tokenContractOwner).burn(1);
        expect(1).to.equal(await snad.totalSupply());
        await snad.connect(tokenContractOwner).burn(3);
        // all tokens have been burnt
        expect(0).to.equal(await snad.totalSupply());
        await expect(snad.connect(tokenContractOwner).burn(1)).to.be.revertedWith(
            "ERC721: invalid token ID"
        );
    });

    it("returns ERC2981 royalty", async () => {
        const { snad } = await loadFixture(snadTestFixture);
        const [recipient, royalty] = await snad.royaltyInfo(1, ethers.utils.parseEther("10"));
        expect(recipient).to.equal(await snad.owner());
        expect(ethers.utils.formatEther(royalty)).to.equal("1.0");
    });

    it("returns dataUri from SIMPLE_NET_ART_DIAGRAM", async () => {
        // to ensure the on- & off-chain data stay in sync
        const { snad } = await loadFixture(snadTestFixture);
        expect(dataUri).to.equal(await snad.SIMPLE_NET_ART_DIAGRAM());
    });
});
