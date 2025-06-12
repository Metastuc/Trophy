import { PrivyClient } from "@privy-io/server-auth";
import { PRIVY_APP_ID, PRIVY_APP_SECRET } from "../utils/env";

export const privy = new PrivyClient(PRIVY_APP_ID, PRIVY_APP_SECRET);
