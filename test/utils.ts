import { TypedDataField } from '@ethersproject/abstract-signer'
import { parseEther } from '@ethersproject/units';
import { BigNumber, BigNumberish, BytesLike, Contract, Signer, Wallet } from 'ethers'

import { EthereumProvider } from "hardhat/types";

export async function takeSnapshot(provider: EthereumProvider) {
  return (await provider.request({
    method: "evm_snapshot",
  })) as string;
}

export async function revert(provider: EthereumProvider, snapshotId: string) {
  await provider.request({
    method: "evm_revert",
    params: [snapshotId],
  });
}

export async function getProvider(
  provider?: EthereumProvider
): Promise<EthereumProvider> {
  if (provider !== undefined) {
    return provider;
  }

  const hre = await import("hardhat");
  return hre.network.provider;
}

export function wrapWithTitle(title: string | undefined, str: string) {
  if (title === undefined) {
    return str;
  }

  return `${title} at step "${str}"`;
}

const DAY = 60 * 60 * 24

export const ETHER = (amount: number = 1) => parseEther(amount.toString());
export const DAYS = (days: number = 1) => days * DAY;

/**
 * ThisMocha helper reverts all your state modifications in an `after` hook.
 *
 * @param title A title that's included in all the hooks that this helper uses.
 * @param provider The network provider.
 */
export function revertAfter(title?: string, provider?: EthereumProvider) {
  let snapshotId: string | undefined;
  before(
    wrapWithTitle(title, "resetAfter: taking snapshot"),
    async function () {
      snapshotId = await takeSnapshot(await getProvider(provider));
    }
  );

  after(wrapWithTitle(title, "resetAfter: reverting state"), async function () {
    if (snapshotId !== undefined) {
      await revert(await getProvider(provider), snapshotId);
    }
  });
}