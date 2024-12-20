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
          className="w-full mt-1 p-2 rounded-md border border-gray-700 bg-white/5 rounded-l-lg focus:border-purple-400 focus:outline-none"
          placeholder="Enter your promo code"
          disabled={isVerifying}
          
        />
        
      </div>

      {status.message && (
        <p className={`mt-2 ${status.isValid ? 'text-green-400' : 'text-red-400'}`}>
          {status.message}
        </p>
      )}

      
    </div>
  );
};