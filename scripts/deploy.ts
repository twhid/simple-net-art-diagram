import { ethers, artifacts, run } from "hardhat";
import { join } from "path";
import { writeFileSync, existsSync, readFileSync } from "fs";

import type { SimpleNetArtDiagram } from "../types";
type Addresses = { address: string; transactionHash: string };

if (!process.env.CHAIN_ID) {
    throw new Error("CHAIN_ID must be in the environment and correspond to the chain to which you wish to deploy.");
}

const CONTRACT_NAME = "SimpleNetArtDiagram";
const chainId = process.env.CHAIN_ID;
let snad: SimpleNetArtDiagram;

async function main() {
    // ensure contracts are compiled
    await run("compile");

    const SNAD = await ethers.getContractFactory(CONTRACT_NAME);
    snad = await SNAD.deploy();
    await snad.deployed();
    console.log("Deployed to:", snad.address, await snad.name());

    // Write ABI file
    const abiPath = join(__dirname, `../${CONTRACT_NAME}.json`);
    const artifact = artifacts.readArtifactSync(CONTRACT_NAME);
    // Overwrite the ABI each time the contract is deployed
    writeFileSync(abiPath, JSON.stringify({ contractName: artifact.contractName, abi: artifact.abi }, null, 4));
    console.log("ABI written successfully");

    // Write address file
    const addressFilePath = join(__dirname, `../addresses.json`);
    let addresses: Record<string, Addresses> & {} = {};
    if (existsSync(addressFilePath)) {
        const json = readFileSync(addressFilePath).toString("utf-8");
        addresses = JSON.parse(json);
    }
    addresses[chainId] = {
        address: snad.address,
        transactionHash: snad.deployTransaction.hash,
    };
    writeFileSync(addressFilePath, JSON.stringify(addresses, null, 4));
    console.log("Addresses written successfully");
}

// use async/await everywhere and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
