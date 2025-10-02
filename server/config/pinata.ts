import { PinataSDK } from "pinata";

import { SERVER_ENV } from "./constants";

let pinata: PinataSDK | null = null;

export function getPinataClient() {
    if (!pinata) {
        pinata = new PinataSDK({
            pinataJwt: SERVER_ENV.PINATA_JWT,
            pinataGateway: SERVER_ENV.PINATA_GATEWAY,
        });
    }
    return pinata;
}
