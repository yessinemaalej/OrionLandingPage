require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from .env

module.exports = {
  solidity: "0.8.20", // Make sure this matches your Solidity version
  networks: {
    hardhat: {}, // Local Hardhat network
    odysseyTestnet: {
      url: process.env.ODYSSEY_TESTNET_RPC, // Add Odyssey testnet RPC URL in .env
      accounts: [process.env.PRIVATE_KEY],  // Add private key in .env
    },
    odysseyMainnet: {
      url: process.env.ODYSSEY_MAINNET_RPC, // Add Odyssey mainnet RPC URL in .env
      accounts: [process.env.PRIVATE_KEY],  // Add private key in .env
    },
  },
  etherscan: {
    apiKey: process.env.BLOCK_EXPLORER_API_KEY, // Odyssey chain block explorer API key (if available)
  },
};