import React from 'react';
import { Modal } from './Modal';
import { Download, Wallet, ArrowRight, AlertCircle } from 'lucide-react';

interface Web3ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'install' | 'network' | 'connect' | 'insufficient_funds';
  isLoading?: boolean;
  onAction: () => void;
}

export const Web3Modal: React.FC<Web3ModalProps> = ({
  isOpen,
  onClose,
  type,
  isLoading,
  onAction,
}) => {
  const content = {
    install: {
      title: 'MetaMask Required',
      description: 'To proceed with the payment, you need to install MetaMask first.',
      icon: <Download className="w-12 h-12 text-purple-500" />,
      actionText: 'Install MetaMask',
    },
    network: {
      title: 'Switch Network',
      description: 'Please switch to Odyssey Chain Testnet to continue.',
      icon: <ArrowRight className="w-12 h-12 text-purple-500" />,
      actionText: 'Switch Network',
    },
    connect: {
      title: 'Connect Wallet',
      description: 'Please connect your MetaMask wallet to proceed with the payment.',
      icon: <Wallet className="w-12 h-12 text-purple-500" />,
      actionText: 'Connect Wallet',
    },
    insufficient_funds: {
      title: 'Insufficient Funds',
      description: 'Your wallet does not have enough DIONE tokens to complete this transaction.',
      icon: <AlertCircle className="w-12 h-12 text-red-500" />,
      actionText: 'Close',
    },
  };

  const { title, description, icon, actionText } = content[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-200 mb-2">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        <button
          onClick={type === 'insufficient_funds' ? onClose : onAction}
          disabled={isLoading}
          className="w-full p-[3px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
            {isLoading ? 'Processing...' : actionText}
          </div>
        </button>
      </div>
    </Modal>
  );
};