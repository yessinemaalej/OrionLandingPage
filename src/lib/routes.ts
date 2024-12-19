// Separate route configuration
import { hashRoute } from './hash';

export const PROTECTED_ROUTES = {
  admin: hashRoute('admin'),
  dashboard: hashRoute('dashboard'),
  settings: hashRoute('settings'),
} as const;

// Reverse map for looking up original routes
export const HASHED_ROUTES = Object.entries(PROTECTED_ROUTES).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value]: key,
  }),
  {} as Record<string, string>
);