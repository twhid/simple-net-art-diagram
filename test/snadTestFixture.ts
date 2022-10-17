import { ethers } from "hardhat";

export async function snadTestFixture() {
    const [tokenContractOwner, otherSigner] = await ethers.getSigners();
    const SNAD = await ethers.getContractFactory("SimpleNetArtDiagram");
    const snad = await SNAD.connect(tokenContractOwner).deploy();
    await snad.deployed();

    async function mintMax(signer = tokenContractOwner) {
        return await (await snad.connect(signer).mintMax()).wait();
    }

    return {
        tokenContractOwner,
        otherSigner,
        snad,
        mintMax,
    };
}
