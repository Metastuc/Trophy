/* eslint-disable simple-import-sort/imports */
import { DEGEN, USDC, ZORA } from "@/lib/contracts";
import {
  createMeeClient,
  getMEEVersion,
  greaterThanOrEqualTo,
  MEEVersion,
  runtimeERC20BalanceOf,
  toMultichainNexusAccount,
} from "@biconomy/abstractjs";
import { EIP1193Provider } from "@privy-io/react-auth";
import { type Address, custom, parseAbi, parseEther, parseUnits } from "viem";
import { network } from "./constants";
import { getWalletClient } from "./viem";

export const ethTip = async (recipient: string, amount: string, provider: EIP1193Provider) => {
  const walletClient = getWalletClient(provider);

  const hash = await walletClient.sendTransaction({
    account: walletClient.account!,
    chain: walletClient.chain,
    to: recipient as Address,
    value: parseEther(amount),
  });

  return hash;
};

export const tipUSDC = async (
  recipient: string,
  amount: string,
  userAddress: Address,
  wallet: string,
  provider: EIP1193Provider,
) => {
  return await tipToken(recipient, USDC, amount, userAddress, provider, wallet, true);
};

export const tipZORA = async (
  recipient: string,
  amount: string,
  userAddress: Address,
  provider: EIP1193Provider,
  wallet: string,
) => {
  return await tipToken(recipient, ZORA, amount, userAddress, provider, wallet);
};

export const tipDEGEN = async (
  recipient: string,
  amount: string,
  userAddress: Address,
  provider: EIP1193Provider,
  wallet: string,
) => {
  return await tipToken(recipient, DEGEN, amount, userAddress, provider, wallet);
};

export const tipCreatorToken = async (
  recipient: string,
  contractAddress: string,
  amount: string,
  userAddress: Address,
  provider: EIP1193Provider,
  wallet: string,
) => {
  return await tipToken(recipient, contractAddress, amount, userAddress, provider, wallet);
};

const tipToken = async (
  recipient: string,
  contractAddress: string,
  amount: string,
  accountAddress: Address,
  signer: EIP1193Provider,
  wallet: string,
  usdc?: boolean,
) => {
  const nexusAccount = await toMultichainNexusAccount({
    chainConfigurations: [{
      chain: network,
      transport: custom(signer),
      version: getMEEVersion(MEEVersion.V2_1_0),
    }],
    signer,
    accountAddress,
  });

  const MeeClient = await createMeeClient({ account: nexusAccount });
  const tokenAddress = contractAddress as unknown as Address;
  const recieverAddress = recipient as unknown as Address;

  const decimals = usdc ? 6 : 18;
  const chainId = network.id as unknown as number;
  const tokenInUnits = parseUnits(amount, decimals);

  const sendTokenIx = await nexusAccount.buildComposable({
    type: "default",
    data: {
      abi: parseAbi(["function transfer(address to, uint256 amount) nonpayable"]),
      chainId,
      to: tokenAddress,
      functionName: "transfer",
      args: [
        recieverAddress,
        runtimeERC20BalanceOf({
          tokenAddress,
          targetAddress: nexusAccount.addressOn(chainId, true),
          constraints: [greaterThanOrEqualTo(tokenInUnits)],
        }),
      ],
    },
  });

  if (wallet !== "privy") {
    const fusionQuote = await MeeClient.getFusionQuote({
      trigger: {
        chainId,
        tokenAddress,
        amount: tokenInUnits,
      },
      instructions: [sendTokenIx],
      feeToken: {
        address: tokenAddress,
        chainId,
      },
    });

    const { hash } = await MeeClient.executeFusionQuote({ fusionQuote });

    const { hash: superHash } = await MeeClient.waitForSupertransactionReceipt({ hash });

    return superHash;
  }

  const quote = await MeeClient.getQuote({
    instructions: [sendTokenIx],
    delegate: true,

    feeToken: {
      address: tokenAddress,
      chainId,
    },
  });

  const { hash } = await MeeClient.executeQuote({ quote });

  const { hash: superHash } = await MeeClient.waitForSupertransactionReceipt({ hash });

  return superHash;
};
