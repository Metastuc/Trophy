import { AuthTokenClaims } from "@privy-io/server-auth";

declare global {
  namespace Express {
    interface Request {
      privyUser?: AuthTokenClaims;
    }
  }
}
