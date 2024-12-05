"use client";
import React, { useState, useEffect } from "react";
import { Eip1193Provider, ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import contractJson from "../../smart-contracts/artifacts/contracts/Checkout.sol/Checkout.json";

import axios from "axios";
declare global {
    interface Window {
      ethereum?: MetaMaskInpageProvider;
    }
  }

const AdminContent = () => {
  const [owner, setOwner] = useState<string>("");
  const [payers, setPayers] = useState<string[]>([]);
  const [withdrawStatus, setWithdrawStatus] = useState<string>("");

  const [promoCodes, setPromoCodes] = useState<
    { code: string; discount: number }[]
  >([]);
  const [newPromoCode, setNewPromoCode] = useState<string>("");
  const [newPromoDiscount, setNewPromoDiscount] = useState<number>(0);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [users, setUsers] = useState<
  {
    walletAddress: string;
    shipmentDetails: {
      fullName: string;
      email: string;
      country: string;
      city: string;
      zipCode: string;
      addressLine1: string;
      addressLine2: string;
      phoneNumber: string;
    };
    shipmentStatus: string;
    transactionHash: string;
  }[]
>([]);
const [selectedUser, setSelectedUser] = useState<string | null>(null); // Currently selected user for status update
  const [newStatus, setNewStatus] = useState<string>("Not Shipped"); // New status to apply
  const [contractBalance, setContractBalance] = useState<string>("0");
  
  const fetchContractBalance = async (
    contractAddress: string,
    providerUrl: string = process.env.NEXT_PUBLIC_TESTNET_END_POINT as string // Replace with the correct provider URL
  ): Promise<string> => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Connect to the provider
  
      // Get the balance of the contract
        const balance =await contract.getBalance();
      // Convert the balance from wei to ether (DIONE tokens are assumed to have 18 decimals)
      return balance.toString();
    } catch (error) {
      console.error("Error fetching contract balance:", error);
      return "0";
    }
  };
  const withdrawFunds = async () => {
    try {
      setWithdrawStatus("Processing...");
      const contract = await connectToContract();

      const transaction = await contract?.withdraw(); // Call the withdraw function
      await transaction.wait(); // Wait for the transaction to be mined

      setWithdrawStatus("Funds withdrawn successfully!");
      fetchContractBalance(contractAddress); // Refresh the balance after withdrawal
    } catch (error: any) {
      console.error("Error withdrawing funds:", error);
      setWithdrawStatus(error.reason || "Withdrawal failed.");
    }
  };
  console.log("Environment variables:", process.env);

  const updateShipmentStatus = async () => {
    if (!selectedUser) return;

    try {
      await axios.patch(`http://localhost:5005/api/users/${selectedUser}`, {
        shipmentStatus: newStatus,
      });
      setSelectedUser(null); // Close the modal
      fetchUsers(); // Refresh users
    } catch (error) {
      console.error("Error updating shipment status:", error);
    }
  };
  const shortenAddressOrHash = (value: string): string => {
    if (!value) return "";
    return `${value.slice(0, 6)}...${value.slice(-6)}`;
  };
const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchBalance = async () => {
    const balance = await fetchContractBalance(contractAddress);
    setContractBalance(balance);
  };

  // Use Effect to Fetch Data
  useEffect(() => {
    fetchUsers();
  }, []);
  const contractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS; // Replace with your contract address
  console.log("ffffffff", contractAddress)
  const contractABI = contractJson.abi;

  const connectToContract = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to proceed.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  };

  const fetchOwner = async () => {
    const contract = await connectToContract();
    const ownerAddress = await contract?.owner();
    setOwner(ownerAddress);
  
    const accounts = await window.ethereum?.request({
      method: "eth_requestAccounts",
    }) as string[]; // Explicitly type the result as a string array.
  
    if (accounts && accounts[0]) {
      setIsOwner(accounts[0].toLowerCase() === ownerAddress.toLowerCase());
    } else {
      console.error("No accounts found.");
    }
  };

  const fetchPayers = async () => {
    const contract = await connectToContract();
    const allPayers = await contract?.getAllPayers();
    setPayers(allPayers);
  };

  const fetchPromoCodes = async () => {
    const contract = await connectToContract();
    const [codes, discounts] = await contract?.getAllPromoCodes();
  
    console.log("Codes:", codes);
    console.log("Discounts:", discounts);
  
    const formattedPromoCodes = codes
      .map((code: string, index: number) => {
        console.log("Processing Discount:", discounts[index]); // Inspect each discount value
        const discountValue = discounts[index]; // Raw value
        return {
          code,
          discount: typeof discountValue === 'bigint' ? Number(discountValue) : discountValue,
        };
      })
      .filter((promo: { discount: number; }) => promo.discount > 0);
  
    setPromoCodes(formattedPromoCodes);
  };

  const addPromoCode = async () => {
    const contract = await connectToContract();
    await contract?.setPromoCode(newPromoCode, newPromoDiscount);
    setNewPromoCode("");
    setNewPromoDiscount(0);
    fetchPromoCodes(); // Refresh promo codes
  };

  const removePromoCode = async (code: string) => {
    const contract = await connectToContract();
    await contract?.removePromoCode(code);
    fetchPromoCodes(); // Refresh promo codes
  };

  // Listen for account changes
  useEffect(() => {
    const handleAccountsChanged = () => {
      fetchOwner();
      fetchUsers();
      fetchPromoCodes();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Initial fetch
    fetchOwner();
    fetchUsers();
    fetchPromoCodes();
    fetchBalance();


    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  if (!isOwner) {
    return (
      null
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-purple-800 to-purple-500 min-h-screen text-white py-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-12">
          Admin Panel
        </h1>

        {/* Summary Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-purple-700 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Total Payers</h2>
            <p className="text-4xl font-extrabold">{users.length}</p>
          </div>
          <div className="bg-purple-700 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Total Revenue</h2>
            <p className="text-4xl font-extrabold">{contractBalance} DIONE</p>
            <button
              onClick={withdrawFunds}
              className="mt-4 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Withdraw Funds
            </button>
            {withdrawStatus && (
              <p
                className={`mt-2 ${
                  withdrawStatus.includes("successfully")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {withdrawStatus}
              </p>
            )}
          </div>
        </section>

{/* Users Section */}
<section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Users</h2>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="bg-black bg-opacity-50 p-6 rounded-lg shadow-md"
                >
                                    <h3 className="text-xl font-bold mb-4">
                    {user.shipmentDetails.fullName || "Unknown User"}
                  </h3>
                  <p>
                <strong>Wallet Address:</strong>{" "}
                <a
                  href={`https://testnet.odysseyscan.com/address/${user.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 underline hover:text-purple-300"
                >
                  {shortenAddressOrHash(user.walletAddress)}
                </a>
              </p>
              <p>
                <strong>Transaction Hash:</strong>{" "}
                <a
                  href={`https://testnet.odysseyscan.com/tx/${user.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 underline hover:text-purple-300"
                >
                  {shortenAddressOrHash(user.transactionHash)}
                </a>
              </p>
                  <p>
                    <strong>Shipment Status:</strong>{" "}
                    <span
                      className={`${
                        user.shipmentStatus === "Shipped"
                          ? "text-green-400"
                          : user.shipmentStatus === "In Progress"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {user.shipmentStatus}
                    </span>
                  </p>
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold">Shipment Details:</h4>
                    <p>
                      <strong>Email:</strong> {user.shipmentDetails.email}
                    </p>
                    <p>
                      <strong>Country:</strong> {user.shipmentDetails.country}
                    </p>
                    <p>
                      <strong>City:</strong> {user.shipmentDetails.city}
                    </p>
                    <p>
                      <strong>ZIP Code:</strong> {user.shipmentDetails.zipCode}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {user.shipmentDetails.addressLine1}
                      {user.shipmentDetails.addressLine2 &&
                        `, ${user.shipmentDetails.addressLine2}`}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {user.shipmentDetails.phoneNumber}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedUser(user.walletAddress)}
                      className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </section>

        {/* Modal for Status Update */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Update Shipment Status</h2>
              <p>
                <strong>Wallet Address:</strong> {selectedUser}
              </p>
              <div className="mt-4">
                <label className="block mb-2 font-semibold">
                  Select New Status:
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-3 bg-black bg-opacity-50 rounded-lg border border-purple-600"
                >
                  <option value="Not Shipped">Not Shipped</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={updateShipmentStatus}
                  className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Promo Codes Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Promo Codes</h2>
          <ul className="space-y-4 mb-6">
            {promoCodes.map((promo, index) => (
              <li
                key={index}
                className="bg-black bg-opacity-50 p-4 rounded-lg flex justify-between items-center"
              >
                <span>
                  {promo.code} - {promo.discount}%
                </span>
                <button
                  onClick={() => removePromoCode(promo.code)}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Promo Code"
              value={newPromoCode}
              onChange={(e) => setNewPromoCode(e.target.value)}
              className="w-full p-3 bg-black bg-opacity-50 rounded-lg border border-purple-600"
            />
            <input
              type="number"
              placeholder="Discount %"
              value={newPromoDiscount}
              onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
              className="w-full p-3 bg-black bg-opacity-50 rounded-lg border border-purple-600"
            />
            <button
              onClick={addPromoCode}
              className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default AdminContent;
