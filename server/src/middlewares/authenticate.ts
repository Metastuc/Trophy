import { NextFunction, Request, Response } from "express";
import { privy } from "../config/privy";
import { PRIVY_KEY } from "../utils/env";

export async function authenticate(request: Request, response: Response, next: NextFunction) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    response.status(401).json({
      status: "error",
      message: "authorization token is missing or invalid",
    });
    return;
  }

  try {
    request.privyUser = await privy.verifyAuthToken(authorizationHeader.split(" ")[1], PRIVY_KEY);

    next();
  } catch (error) {
    response.status(403).json({
      error: (error as Error).message,
      message: "invalid token",
    });
  }
}
