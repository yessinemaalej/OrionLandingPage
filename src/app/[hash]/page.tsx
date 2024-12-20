"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Eip1193Provider, ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import {
  Activity,
  Package,
  Tag,
  Wallet,
  Search,
  Clock,
  XCircle,
  Truck,
  User,
  DollarSign,
} from "lucide-react";
import contractJson from "../../Checkout.json";
import axios from "axios";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

// Types
type ShipmentDetails = {
    orderId: String,
  fullName: string;
  email: string;
  country: string;
  city: string;
  zipCode: string;
  addressLine1: string;
  addressLine2: string;
  phoneNumber: string;
};

type User = {
  walletAddress: string;
  shipmentDetails: ShipmentDetails;
  shipmentStatus: string;
  transactionHash: string;
};

type TabType = "overview" | "users" | "promo";

// Internal Components
const StatCard = ({
  title,
  value,
  icon: Icon,
  className = "",
}: {
  title: string;
  value: string | number;
  icon: any;
  className?: string;
}) => (
  <div
    className={`bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-500/20 ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      <Icon className="text-purple-400" size={24} />
    </div>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
  <div className="relative mb-6">
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={20}
    />
    <input
      type="text"
      placeholder="Search by email or transaction hash..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full bg-gray-900 border border-purple-500/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500"
    />
  </div>
);

const UserCard = ({
  user,
  onUpdateStatus,
}: {
  user: User;
  onUpdateStatus: (address: string) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "text-green-400";
      case "In Progress":
        return "text-yellow-400";
      default:
        return "text-red-400";
    }
  };

  const shortenAddressOrHash = (value: string): string => {
    if (!value) return "";
    return `${value.slice(0, 6)}...${value.slice(-6)}`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-500/20">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-purple-400">
          {user.shipmentDetails.fullName || "Unknown User"}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
            user.shipmentStatus
          )}`}
        >
          {user.shipmentStatus}
        </span>
      </div>
      <div className="space-y-3 text-gray-300">
        <p className="flex items-center gap-2">
          <span className="font-semibold">Wallet:</span>
          <a
            href={`https://odysseyscan.com/address/${user.walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 truncate"
          >
            {shortenAddressOrHash(user.walletAddress)}
          </a>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold">Transaction:</span>
          <a
            href={`https://odysseyscan.com/tx/${user.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 truncate"
          >
            {shortenAddressOrHash(user.transactionHash)}
          </a>
        </p>
        <div className="pt-4 border-t border-gray-700">
          <h4 className="font-semibold mb-2">Shipping Details</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>
              <span className="text-gray-400">Email:</span>{" "}
              {user.shipmentDetails.email}
            </p>
            <p>
              <span className="text-gray-400">Phone:</span>{" "}
              {user.shipmentDetails.phoneNumber}
            </p>
            <p>
              <span className="text-gray-400">Country:</span>{" "}
              {user.shipmentDetails.country}
            </p>
            <p>
              <span className="text-gray-400">City:</span>{" "}
              {user.shipmentDetails.city}
            </p>
            <p className="col-span-2">
              <span className="text-gray-400">Address:</span>{" "}
              {user.shipmentDetails.addressLine1}
              {user.shipmentDetails.addressLine2 &&
                `, ${user.shipmentDetails.addressLine2}`}
            </p>
          </div>
        </div>
        <button
          onClick={() => onUpdateStatus(user.walletAddress)}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

const TransferOwnershipCard = ({
  onTransfer,
}: {
  onTransfer: (address: string) => void;
}) => {
  const [newOwner, setNewOwner] = useState("");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [owner, setOwner] = useState("");

  const contractAddress = "0x85b7800448c7133d403734D6CB9C629BAd3aAEdf";
  const contractABI = contractJson.abi;
  const connectToContract = async () => {
    try {
      if (!window.ethereum) {
        console.log("MetaMask is not installed. Please install it to proceed.");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      return contract;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOwner = async () => {
    try {
      const contract = await connectToContract();
      const ownerAddress = await contract?.owner();
      setOwner(ownerAddress);
      const accounts = (await window.ethereum?.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (accounts && accounts[0]) {
        setIsOwner(accounts[0].toLowerCase() === ownerAddress.toLowerCase());
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleAccountsChanged = () => {
      fetchOwner();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    fetchOwner();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-300">
          Transfer Ownership
        </h3>
        <User className="text-purple-400" size={24} />
      </div>
      <input
        type="text"
        placeholder="New Owner Address"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
        className="w-full bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-purple-500"
      />
      <button
        onClick={() => {
          if (newOwner) {
            onTransfer(newOwner);
            setNewOwner("");
          }
        }}
        disabled={!isOwner}
        className={`w-full py-2 px-4 rounded-lg transition-colors ${
          isOwner
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
      >
        Transfer Ownership
      </button>
    </div>
  );
};

const UpdatePriceCard = ({
  onUpdate,
}: {
  onUpdate: (price: string) => void;
}) => {
  const [newPrice, setNewPrice] = useState("");

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-300">Update Price</h3>
        <DollarSign className="text-purple-400" size={24} />
      </div>
      <input
        type="text"
        placeholder="New Price (in DIONE)"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        className="w-full bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-purple-500"
      />
      <button
        onClick={() => {
          if (newPrice) {
            onUpdate(newPrice);
            setNewPrice("");
          }
        }}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        Update Price
      </button>
    </div>
  );
};

const StatusModal = ({
  user,
  newStatus,
  onStatusChange,
  onClose,
  onUpdate,
}: {
  user: string;
  newStatus: string;
  onStatusChange: (status: string) => void;
  onClose: () => void;
  onUpdate: () => void;
}) => (
  <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Update Shipment Status</h2>
      <select
        value={newStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:border-purple-500"
      >
        <option value="Not Shipped">Not Shipped</option>
        <option value="In Progress">In Progress</option>
        <option value="Shipped">Shipped</option>
      </select>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onUpdate}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  </div>
);

// Main Component
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
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("Not Shipped");
  const [contractBalance, setContractBalance] = useState<string>("0");
  const [transferStatus, setTransferStatus] = useState<string>("");
  const [updatePriceStatus, setUpdatePriceStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const contractAddress = "0x85b7800448c7133d403734D6CB9C629BAd3aAEdf";
  const contractABI = contractJson.abi;

  const connectToContract = async () => {
    try {
      if (!window.ethereum) {
        console.log("MetaMask is not installed. Please install it to proceed.");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      return contract;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchContractBalance = async () => {
    try {
      const provider = new ethers.BrowserProvider(
        window.ethereum as Eip1193Provider
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const balance = await contract.getBalance();
      setContractBalance(balance.toString());
    } catch (error) {
      console.error("Error fetching contract balance:", error);
    }
  };

  const withdrawFunds = async () => {
    try {
      setWithdrawStatus("Processing...");
      const contract = await connectToContract();
      const transaction = await contract?.withdraw();
      await transaction.wait();
      setWithdrawStatus("Funds withdrawn successfully!!");
      fetchContractBalance();
    } catch (error: any) {
      console.error("Error withdrawing funds:", error);
      setWithdrawStatus(error.reason || "Withdrawal failed.");
    }
  };

  const fetchOwner = async () => {
    try {
      const contract = await connectToContract();
      const ownerAddress = await contract?.owner();
      setOwner(ownerAddress);
      const accounts = (await window.ethereum?.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (accounts && accounts[0]) {
        setIsOwner(accounts[0].toLowerCase() === ownerAddress.toLowerCase());
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPromoCodes = async () => {
    try {
      const contract = await connectToContract();
      const [codes, discounts] = await contract?.getAllPromoCodes();
      const formattedPromoCodes = codes
        .map((code: string, index: number) => ({
          code,
          discount:
            typeof discounts[index] === "bigint"
              ? Number(discounts[index])
              : discounts[index],
        }))
        .filter((promo: { discount: number }) => promo.discount > 0);
      setPromoCodes(formattedPromoCodes);
    } catch (e) {
      console.log(e);
    }
  };

  const addPromoCode = async () => {
    try {
      const contract = await connectToContract();
      await contract?.setPromoCode(newPromoCode, newPromoDiscount);
      setNewPromoCode("");
      setNewPromoDiscount(0);
      fetchPromoCodes();
    } catch (e) {
      console.log(e);
    }
  };

  const removePromoCode = async (code: string) => {
    try {
      const contract = await connectToContract();
      await contract?.removePromoCode(code);
      fetchPromoCodes();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://evening-crag-08562-ae65e95d4573.herokuapp.com/api/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateShipmentStatus = async () => {
    if (!selectedUser) return;
    try {
      await axios.patch(
        `https://evening-crag-08562-ae65e95d4573.herokuapp.com/api/users/${selectedUser}`,
        {
          shipmentStatus: newStatus,
        }
      );
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating shipment status:", error);
    }
  };

  const transferOwnership = async (newOwner: string) => {
    try {
      setTransferStatus("Processing...");
      const contract = await connectToContract();
      const transaction = await contract?.transferOwnership(newOwner);
      await transaction.wait();
      setTransferStatus("Ownership transferred successfully!");
      fetchOwner(); // Refresh owner information
    } catch (error: any) {
      console.error("Error transferring ownership:", error);
      setTransferStatus(error.reason || "Transfer failed.");
    }
  };

  const updatePrice = async (newPrice: string) => {
    try {
      setUpdatePriceStatus("Processing...");
      const contract = await connectToContract();
      const transaction = await contract?.updatePaymentAmount(
        ethers.parseEther(newPrice)
      );
      await transaction.wait();
      setUpdatePriceStatus("Price updated successfully!");
    } catch (error: any) {
      console.error("Error updating price:", error);
      setUpdatePriceStatus(error.reason || "Update failed.");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.shipmentDetails.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.transactionHash.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const stats = useMemo(() => {
    const shipped = users.filter((u) => u.shipmentStatus === "Shipped").length;
    const inProgress = users.filter(
      (u) => u.shipmentStatus === "In Progress"
    ).length;
    const notShipped = users.filter(
      (u) => u.shipmentStatus === "Not Shipped"
    ).length;
    return { shipped, inProgress, notShipped };
  }, [users]);

  useEffect(() => {
    const handleAccountsChanged = () => {
      fetchOwner();
      fetchUsers();
      fetchPromoCodes();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    fetchOwner();
    fetchUsers();
    fetchPromoCodes();
    fetchContractBalance();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === "overview"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Activity size={18} /> Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === "users"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Package size={18} /> Orders
            </button>
            <button
              onClick={() => setActiveTab("promo")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === "promo"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Tag size={18} /> Promo Codes
            </button>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <StatCard
                title="Total Orders"
                value={users.length}
                icon={Package}
              />
              <StatCard
                title="Active Promo Codes"
                value={promoCodes.length}
                icon={Tag}
              />
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-300">
                    Contract Balance
                  </h3>
                  <Wallet className="text-purple-400" size={24} />
                </div>
                <p className="text-4xl font-bold mb-4">
                  
                     {ethers.formatEther(contractBalance)} DIONE
                    
                </p>{" "}
                <button
                  disabled={!isOwner}
                  onClick={withdrawFunds}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    isOwner
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Shipped Orders"
                value={stats.shipped}
                icon={Truck}
                className="bg-green-900/20 border-green-500/20"
              />
              <StatCard
                title="In Progress"
                value={stats.inProgress}
                icon={Clock}
                className="bg-yellow-900/20 border-yellow-500/20"
              />
              <StatCard
                title="Not Shipped"
                value={stats.notShipped}
                icon={XCircle}
                className="bg-red-900/20 border-red-500/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TransferOwnershipCard onTransfer={transferOwnership} />
                {transferStatus && (
                  <p
                    className={`mt-2 text-center ${
                      transferStatus.includes("successfully")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transferStatus}
                  </p>
                )}
              </div>
              <div>
                <UpdatePriceCard onUpdate={updatePrice} />
                {updatePriceStatus && (
                  <p
                    className={`mt-2 text-center ${
                      updatePriceStatus.includes("successfully")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {updatePriceStatus}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <>
            <SearchBar onSearch={setSearchQuery} />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUsers.map((user, index) => (
                <UserCard
                  key={index}
                  user={user}
                  onUpdateStatus={setSelectedUser}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === "promo" && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-500/20">
            <div className="flex gap-4 mb-8">
              <input
                type="text"
                placeholder="Enter promo code"
                value={newPromoCode}
                onChange={(e) => setNewPromoCode(e.target.value)}
                className="flex-1 bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
              <input
                type="number"
                placeholder="Discount %"
                value={newPromoDiscount}
                onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
                className="w-32 bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={addPromoCode}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Code
              </button>
            </div>
            <div className="grid gap-4">
              {promoCodes.map((promo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-purple-500/20"
                >
                  <div>
                    <span className="text-lg font-semibold text-purple-400">
                      {promo.code}
                    </span>
                    <span className="ml-4 text-gray-400">
                      {promo.discount}% discount
                    </span>
                  </div>
                  <button
                    onClick={() => removePromoCode(promo.code)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedUser && (
          <StatusModal
            user={selectedUser}
            newStatus={newStatus}
            onStatusChange={setNewStatus}
            onClose={() => setSelectedUser(null)}
            onUpdate={updateShipmentStatus}
          />
        )}
      </div>
    </div>
  );
};

export default AdminContent;
