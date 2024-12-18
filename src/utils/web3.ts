import { ethers } from 'ethers';
import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { Contract, ContractInterface, Interface, InterfaceAbi } from 'ethers';

export const ODYSSEY_CHAIN = {
  chainId: '0x25641', 
  chainName: 'Odyssey Chain (Mainnet)',
  nativeCurrency: {
    name: 'DIONE',
    symbol: 'DIONE',
    decimals: 18
  },
  rpcUrls: ['https://node.dioneprotocol.com/ext/bc/D/rpc'],
  blockExplorerUrls: ['https://odysseyscan.com/']
} as const;

export const checkMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && Boolean(window.ethereum);
};

export const requestAccount = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    }) as string[];
    
    if (!accounts[0]) {
      throw new Error('No accounts found');
    }
    
    return accounts[0];
  } catch (error) {
    throw new Error('Failed to connect wallet');
  }
};

export const switchToOdysseyChain = async (): Promise<void> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ODYSSEY_CHAIN.chainId }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [ODYSSEY_CHAIN],
        });
      } catch (addError) {
        throw new Error('Failed to add Odyssey Chain to MetaMask');
      }
    } else {
      throw new Error('Failed to switch to Odyssey Chain');
    }
  }
};

export const getCurrentChainId = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    }) as string;
    return chainId;
  } catch (error) {
    throw new Error('Failed to get current chain ID');
  }
};

export const getContract = async (
  address: string, 
  abi: InterfaceAbi
): Promise<Contract> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  const provider = new ethers.BrowserProvider(window.ethereum as any);
  const signer = await provider.getSigner();
  return new ethers.Contract(address, abi, signer);
};

export const checkWalletBalance = async (requiredAmount: number): Promise<boolean> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum as any);
    const signer = await provider.getSigner();
    const balance = await provider.getBalance(signer.address);
    const requiredWei = ethers.parseEther(requiredAmount.toString());


    return balance >= requiredAmount;
  } catch (error) {
    console.error('Error checking wallet balance:', error);
    return false;
  }
};