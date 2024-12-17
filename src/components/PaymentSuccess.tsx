import React from 'react';

interface PaymentSuccessProps {
  transactionHash: string;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ transactionHash }) => {
  return (
    <div className="text-center">
        <br/>
        <br/>
        <br/>

      <h2 className="text-3xl font-bold sm:text-4xl text-green-400">
        Payment Successful!
      </h2>
      <p className="mt-4 text-gray-400">
        Your transaction was successful. Your Orion is on its way!
      </p>
      <p className="mt-2 text-gray-400">
        For further information, please contact us at:{" "}
        <a
          href="mailto:orion@dioneprotocol.com"
          className="text-purple-500 underline"
        >
          orion@dioneprotocol.com
        </a>
      </p>
      <p className="mt-4 text-gray-300">
        <span className="font-bold">Transaction Hash:</span>
        <br />
        <span className="text-purple-500 break-all">{transactionHash}</span>
      </p>
      <p className="mt-4 text-gray-300">
        <a
          href={`https://testnet.odysseyscan.com/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 underline"
        >
          View on Blockchain Explorer
        </a>
      </p>
    </div>
  );
};