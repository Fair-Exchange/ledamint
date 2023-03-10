import { WalletAdapter, WalletError } from '@j0nnyboi/wallet-adapter-base';
import {
  useWallet,
  WalletProvider as BaseWalletProvider,
} from '@j0nnyboi/wallet-adapter-react';
import {
  /* getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,*/
  getSolletWallet,
  // getSolongWallet,
} from '@j0nnyboi/wallet-adapter-wallets';
import { Button, Collapse } from 'antd';
import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { notify } from '../utils';
import { MetaplexModal } from '../components';

const { Panel } = Collapse;

export interface WalletModalContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
}

export const WalletModalContext = createContext<WalletModalContextState>(
  {} as WalletModalContextState,
);

export function useWalletModal(): WalletModalContextState {
  return useContext(WalletModalContext);
}

export const WalletModal: FC = () => {
  const { wallets, select } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  // const phatomWallet = useMemo(() => getPhantomWallet(), []);
  const SolletWallet = useMemo(() => getSolletWallet(), []);

  return (
    <MetaplexModal title="Connect Wallet" visible={visible} onCancel={close}>
      <span>RECOMMENDED</span>

      <Button
        className="phantom-button metaplex-button"
        onClick={() => {
          console.log(SolletWallet.name);
          select(SolletWallet.name);
          close();
        }}
      >
        <img
          src="https://raw.githubusercontent.com/Fair-Exchange/safecoinwiki/master/Logos/SafeCoin/SafeCoin_Icon.svg"
          style={{ width: '1.2rem' }}
        />
        &nbsp;Connect to Safecoin
      </Button>

      <Collapse
        ghost
        expandIcon={panelProps =>
          panelProps.isActive ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7.5L10 12.5L5 7.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )
        }
      >
        <Panel
          header={
            <span
              style={{
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              Other Wallets
            </span>
          }
          key="1"
        >
          {wallets.map((wallet, idx) => {
            if (wallet.name === 'Sollet') return null;

            return (
              <Button
                key={idx}
                className="metaplex-button w100"
                style={{
                  marginBottom: 5,
                }}
                onClick={() => {
                  select(wallet.name);
                  close();
                }}
              >
                Connect to {wallet.name}
              </Button>
            );
          })}
        </Panel>
      </Collapse>
    </MetaplexModal>
  );
};

export const WalletModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { publicKey } = useWallet();
  const [connected, setConnected] = useState(!!publicKey);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      const keyToDisplay =
        base58.length > 20
          ? `${base58.substring(0, 7)}.....${base58.substring(
              base58.length - 7,
              base58.length,
            )}`
          : base58;

      notify({
        message: 'Wallet update',
        description: 'Connected to wallet ' + keyToDisplay,
      });
    }
  }, [publicKey]);

  useEffect(() => {
    if (!publicKey && connected) {
      notify({
        message: 'Wallet update',
        description: 'Disconnected from wallet',
      });
    }
    setConnected(!!publicKey);
  }, [publicKey, connected, setConnected]);

  return (
    <WalletModalContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
      <WalletModal />
    </WalletModalContext.Provider>
  );
};

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallets = useMemo(
    () => [
      // getTorusWallet({
      //   options: {
      //     // @FIXME: this should be changed for Metaplex, and by each Metaplex storefront
      //     clientId:
      //       'BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ',
      //   },
      // }),

      getSolletWallet(),
    ],
    [],
  );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
    notify({
      message: 'Wallet error',
      description: error.message,
    });
  }, []);

  return (
    <BaseWalletProvider wallets={wallets} onError={onError} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </BaseWalletProvider>
  );
};

export type WalletSigner = Pick<
  WalletAdapter,
  'publicKey' | 'signTransaction' | 'signAllTransactions'
>;
