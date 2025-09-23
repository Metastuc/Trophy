// import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
// import { chains, type SmartAccountSigner, WalletClientSigner } from "@alchemy/aa-core";
// import { EIP1193Provider } from "@privy-io/react-auth"
// import { Address, WalletClient } from "viem";

// import { ENV_SCHEMA, network } from "./constants";
// import { getWalletClient } from "./viem";

// export const alchemySmartAccount = async ({ provider, address }: { provider: EIP1193Provider, address: Address }) => {
//   const walletClient = getWalletClient(provider, address) as unknown as WalletClient;
//   const signer: SmartAccountSigner = new WalletClientSigner(
//     walletClient!,
//     "json-rpc"
//   );

//   return await createLightAccountAlchemyClient({
//     signer,
//     chain: network as chains.Chain,
//     apiKey: ENV_SCHEMA.ALCHEMY_API_KEY
//   });
// }