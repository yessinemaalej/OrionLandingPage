import { useState, useCallback } from 'react';
import {
  checkMetaMaskInstalled,
  requestAccount,
  switchToOdysseyChain,
  getCurrentChainId,
  ODYSSEY_CHAIN
} from '../utils/web3';
import { ModalType } from '../types/payment';

export const useWeb3Connection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);

    try {
      if (!checkMetaMaskInstalled()) {
        setModalType('install');
        return null;
      }

      try {
        setModalType('connect');
        const account = await requestAccount();
        setModalType(null);

        const currentChainId = await getCurrentChainId();
        if (currentChainId !== ODYSSEY_CHAIN.chainId) {
          setModalType('network');
          await switchToOdysseyChain();
          setModalType(null);
        }

        return account;
      } catch (error) {
        throw error;
      }
    } catch (err: any) {
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
    setModalType(null)
  };

  return {
    connectWallet,
    isConnecting,
    modalType,
    setModalType,
    handleInstallMetaMask
  };
};