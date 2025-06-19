import { Request } from "express";
import { PrivyUser } from "@privy-io/server-auth";

declare global {
  namespace Express {
    interface Request {
      privyUser?: PrivyUser;
    }
  }
}
