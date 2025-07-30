import { Livepeer } from "livepeer";
import { LIVEPEER_API_KEY } from "../utils/env";

const livepeer = new Livepeer({
  apiKey: LIVEPEER_API_KEY,
});

interface iCreateLivepeerStream {
  name: string;
}

export function createLivepeerStream({ name }: iCreateLivepeerStream) {
  livepeer.stream
    .create({ name })
    .then(function (response) {
      console.log();
      console.log();
      console.log();
      console.log({ response });
      console.log();
      console.log();
      console.log();
    })
    .catch(function (error) {
      console.error({ livePeerError: error });
    });
}
