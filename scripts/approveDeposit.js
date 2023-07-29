// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");

const tokenAddress = "0xCae322ddD4BE401D7d6C390Bde14DEE558E28793"; // place your erc20 contract address here
const tokenABI = tokenContractJSON.abi;
const fxERC20RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0xBeeF8E9b0eABa30e7c1DF83675780C784aa78e2c"; // place your public address for your wallet here

async function main() {

    const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC20RootAddress);

    for(var i=1;i<=5;i++)
    {
      const approveTx = await tokenContract.approve(fxERC20RootAddress, i);
      await approveTx.wait();
    }
    

    console.log('Approval confirmed');


    for(var i=1;i<=5;i++)
    {
      const depositTx = await fxContract.deposit(tokenAddress, walletAddress, i, "0x6556");
      await depositTx.wait();
    }
    

    console.log("Tokens deposited");
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
