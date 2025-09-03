import { PrivyClient } from "@privy-io/server-auth";

import { APP_SETTINGS } from "./settings";

export const privy = new PrivyClient(APP_SETTINGS.PRIVY_APP_ID, APP_SETTINGS.PRIVY_APP_SECRET);
