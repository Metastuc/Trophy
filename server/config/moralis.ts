import moralis from "moralis";

import { SERVER_ENV } from "./constants";

let isMoralisInitialized = false;

export async function MoralisClient() {
    if (!isMoralisInitialized) {
        await moralis.start({ apiKey: SERVER_ENV.MORALIS_API_KEY });
        isMoralisInitialized = true;
    }
    return moralis;
}
