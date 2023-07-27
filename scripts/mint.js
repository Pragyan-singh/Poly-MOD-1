// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");
require('dotenv').config()

const tokenAddress = "0xdB4a0DD31216EE77e8ff63eeBF924cb7611841CB"; // place your erc20 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xBeeF8E9b0eABa30e7c1DF83675780C784aa78e2c"; // place your public address for your wallet here

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    
    //const tx = await token.mint("0xBeeF8E9b0eABa30e7c1DF83675780C784aa78e2c",5);
    //await tx.wait();

    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
  }
  //console.log("ok");
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });