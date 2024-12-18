import React from 'react';
import type { PromoCodeStatus } from '../types/payment';

interface PromoCodeInputProps {
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  onVerify: () => void;
  isVerifying: boolean;
  status: PromoCodeStatus;
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  promoCode,
  onPromoCodeChange,
  onVerify,
  isVerifying,
  status,
}) => {
  return (
    <div>
      <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
        Promo Code (Optional)
      </label>
      <div className="flex gap-x-4">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => onPromoCodeChange(e.target.value)}
          className="min-w-0 flex-auto mt-1 p-2 rounded-md border border-gray-700 bg-white/5 rounded-l-lg focus:border-purple-400 focus:outline-none"
          placeholder="Enter your promo code"
          disabled={isVerifying}
        />
        <button
          type="button"
          onClick={onVerify}
          disabled={isVerifying || !promoCode.trim()}
          className="w-30 mt-3 p-[3px] relative disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
            {isVerifying ? 'Verifying...' : 'Verify'}
          </div>
        </button>
      </div>

      {status.message && (
        <p className={`mt-2 ${status.isValid ? 'text-green-400' : 'text-red-400'}`}>
          {status.message}
        </p>
      )}

      {status.isValid && status.discountedAmount !== null && (
        <p className="mt-2 text-sm font-medium text-green-400">
          Your discounted payment amount: {status.discountedAmount} DIONE
        </p>
      )}
    </div>
  );
};