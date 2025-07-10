import Moralis from "moralis"

import { ENV_SCHEMA } from "./constants";

let moralisStarted: boolean = false;

export default async function MoralisClient() {
  if (moralisStarted) return Moralis;

  await Moralis.start({
    apiKey: ENV_SCHEMA.MORALIS_API_KEY,
  });

  moralisStarted = true;

  return Moralis;
}
