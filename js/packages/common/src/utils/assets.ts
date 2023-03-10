import { calculate } from '@j0nnyboi/arweave-cost';
import { LAMPORTS_PER_SAFE } from '@safecoin/web3.js';

export const LAMPORT_MULTIPLIER = LAMPORTS_PER_SAFE;

export const ARWEAVE_UPLOAD_ENDPOINT =
  'https://bridge.ledamint.io/';

export async function getAssetCostToStore(files: { size: number }[]) {
  const sizes = files.map(f => f.size);
  const result = await calculate(sizes);

  return LAMPORTS_PER_SAFE * result.safecoin;
}
