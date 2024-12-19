// Separate hashing logic
import { createHash } from 'crypto';

export function hashRoute(route: string): string {
  return createHash('sha256')
    .update(route)
    .digest('hex')
    .slice(0, 12);
}