"use client";

import { site } from "@/constants";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { meterTestnet as mt } from "viem/chains";
import { ReactNode } from "react";

export const LOCALHOST_CHAIN_ID: number = 31337;

const projectId = process.env.NEXT_PUBLIC_W3PROJECT_ID as string;

if (!projectId) throw new Error("No project ID found");

const meterTestnet = {
  chainId: mt.id,
  name: mt.name,
  currency: mt.nativeCurrency.symbol,
  explorerUrl: mt.blockExplorers.default.url,
  rpcUrl: mt.rpcUrls.default.http[0],
};

const metadata = {
  name: site.name,
  description: site.description,
  url: site.url,
  icons: [site.icon],
};

const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: LOCALHOST_CHAIN_ID,
});

createWeb3Modal({
  ethersConfig,
  chains: [meterTestnet],
  projectId: projectId,
  enableOnramp: true,
  enableAnalytics: true,
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "'Noto Sans', sans-serif",
    "--w3m-font-size-master": "9px",
  },
});

export function WalletProvider({ children }: { children: ReactNode }) {
  return children;
}
