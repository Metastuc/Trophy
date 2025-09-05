import { PrivyClient } from "@privy-io/server-auth";

import { SERVER_ENV } from "./constants";

export const privy = new PrivyClient(SERVER_ENV.PRIVY_APP_ID, SERVER_ENV.PRIVY_APP_SECRET);
