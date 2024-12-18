export interface ShipmentDetails {
    orderId: string;
    fullName: string;
    email: string;
    country: string;
    city: string;
    zipCode: string;
    addressLine1: string;
    addressLine2: string;
    phoneNumber: string;
  }
  
  export type ModalType = 'install' | 'network' | 'connect' | 'insufficient_funds' | null;
  
  export type PaymentError = 'INSUFFICIENT_FUNDS' | 'TRANSACTION_FAILED' | null;
  
  export interface PromoCodeStatus {
    isValid: boolean;
    message: string | null;
    discountPercentage: number | null;
    discountedAmount: number | null;
  }
  
  export interface PromoCodeVerificationResult {
    isValid: boolean;
    message: string;
    discountPercentage: number | null;
    discountedAmount: number | null;
  }