// Separate route configuration
import { hashRoute } from './hash';

export const PROTECTED_ROUTES = {
  admin: hashRoute('admin'),
  dashboard: hashRoute('dashboard'),
  settings: hashRoute('settings'),
} as const;
