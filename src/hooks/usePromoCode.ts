import { useState } from 'react';
import { verifyPromoCodeWithContract } from '@/utils/promoCode';
import type { PromoCodeStatus } from '../types/payment';

export const usePromoCode = (contractAddress: string, contractABI: any, baseAmount: number) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<PromoCodeStatus>({
    isValid: false,
    message: null,
    discountPercentage: null,
    discountedAmount: null,
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyPromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoStatus({
        isValid: false,
        message: 'Please enter a promo code to verify.',
        discountPercentage: null,
        discountedAmount: null,
      });
      return null;
    }

    setIsVerifying(true);

    try {
      const result = await verifyPromoCodeWithContract(
        promoCode.trim(),
        contractAddress,
        contractABI,
        baseAmount
      );

      setPromoStatus({
        isValid: result.isValid,
        message: result.message,
        discountPercentage: result.discountPercentage,
        discountedAmount: result.discountedAmount,
      });

      return result;
    } catch (error) {
      setPromoStatus({
        isValid: false,
        message: 'Failed to verify promo code. Please try again.',
        discountPercentage: null,
        discountedAmount: null,
      });
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  const resetPromoCode = () => {
    setPromoCode('');
    setPromoStatus({
      isValid: false,
      message: null,
      discountPercentage: null,
      discountedAmount: null,
    });
  };

  return {
    promoCode,
    setPromoCode,
    promoStatus,
    isVerifying,
    verifyPromoCode,
    resetPromoCode,
  };
};