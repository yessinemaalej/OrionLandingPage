const hre = require("hardhat");

async function main() {
  // Set payment amount to 100 wei (directly using wei value)
  const paymentAmount = "100"; // 100 wei

  console.log(`Deploying contract with fixed payment amount: ${paymentAmount} wei`);

  // Get the contract factory
  const Checkout = await hre.ethers.getContractFactory("Checkout");

  // Deploy the contract with the payment amount
  const checkout = await Checkout.deploy(paymentAmount);

  await checkout.waitForDeployment();

  console.log("CryptoCheckout deployed to:", checkout.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//npx hardhat run scripts/deploy.js --network odysseyTestnet