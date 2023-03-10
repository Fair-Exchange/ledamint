import {
  Strategy,
  TokenListContainer,
  TokenListProvider,
} from '@j0nnyboi/safe-token-registry';

let _cachedTokenListContainerPromise: Promise<TokenListContainer> | null;

export function getTokenListContainerPromise() {
  if (_cachedTokenListContainerPromise == null) {
    _cachedTokenListContainerPromise = new TokenListProvider().resolve();
  }
  return _cachedTokenListContainerPromise;
}
