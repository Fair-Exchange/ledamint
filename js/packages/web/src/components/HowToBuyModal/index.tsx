import { InstructionsModal } from '../InstructionsModal';
import React from 'react';
import { LABELS } from '../../constants';
import { ConnectButton } from '@j0nnyboi/common';

interface HowToBuyModalProps {
  buttonClassName: string;
  onClick?: any;
}

export const HowToBuyModal: React.FC<HowToBuyModalProps> = ({
  buttonClassName,
  onClick,
}) => {
  return (
    <InstructionsModal
      buttonClassName={buttonClassName}
      buttonText="How to Buy"
      modalTitle={`Buying NFTs on ${LABELS.STORE_NAME}`}
      cardProps={[
        {
          title: 'Create a SAFE wallet',
          imgSrc: '/modals/how-to-buy-1.png',
          description: `SAFE is the cryptocurrency we use for purchases on ${LABELS.STORE_NAME}. To keep your SAFE safe, you’ll need a crypto wallet—we recommend using wallet.safecoin.org.`,
        },
        {
          title: 'Add funds to your wallet',
          imgSrc: '/modals/how-to-buy-2.png',
          description: `To fund your wallet, you’ll need to purchase Safecoin. The easiest way is on SafeTrade. A new window will open where you can create an SafeTrade account and purchase SAFE.`,
        },
        {
          title: `Connect your wallet to ${LABELS.STORE_NAME}.`,
          imgSrc: '/modals/how-to-buy-3.png',
          description: `To connect your wallet, tap “Connect Wallet” here on the site. Select the Safecoin option, and your wallet will connect. After that, you can start bidding on NFTs.`,
          endElement: <ConnectButton className={'secondary-btn'} />,
        },
      ]}
      onClick={onClick}
    />
  );
};
