import { EnEvent, EnStatus } from "@/enums";
import { getStatus } from "@/lib/utils";
import { getBlumaTokenContract, ethereum } from ".";
import { ethers } from "ethers";

export const getTokenTotalSupply = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install a browser provider");
    }

    const contract = await getBlumaTokenContract();
    const supply: number = await contract.totalSupply();

    return Number(supply);
  } catch (error) {
    reportError(error);
    throw error;
  }
};

export const getRemainingSupply = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install a browser provider");
    }

    const contract = await getBlumaTokenContract();
    const remaining: number = await contract.remainingSupply();

    return Number(remaining);
  } catch (error) {
    reportError(error);
    throw error;
  }
};

export const getUserBalance = async (address: string) => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install a browser provider");
    }

    const contract = await getBlumaTokenContract();
    const balance: number = await contract.balanceOf(address);

    return Number(balance);
  } catch (error) {
    reportError(error);
    throw error;
  }
};

export const checkIfUserHasMinted = async (address: string) => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install a browser provider");
    }

    const contract = await getBlumaTokenContract();
    const minted: boolean = await contract.hasMinted(address);

    return minted;
  } catch (error) {
    reportError(error);
    throw error;
  }
};

export const mintTokenToUser = async (address: string, amount: number) => {
  if (!window.ethereum) {
    throw new Error("Please install a browser provider");
  }
  try {
    const contract = await getBlumaTokenContract();

    const tx = await contract.mint(address, Number(amount));
    const result = await tx.wait();

    if (!result.status) throw new Error("Could not mint token");

    return tx;
  } catch (error) {
    reportError(error);
    throw error;
  }
};
