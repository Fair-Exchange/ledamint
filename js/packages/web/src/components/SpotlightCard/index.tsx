import { CountdownState, toPublicKey } from '@j0nnyboi/common';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AuctionView,
  AuctionViewState,
  useBidsForAuction,
  useCreators,
  useExtendedArtNoRef,
  useUserBalance,
} from '../../hooks';
import { useCachedImage, useExtendedArt } from '../../hooks';
import { LiveAuctionViewState } from '../../views/home/components/SalesList';
import { useAuctionsList } from '../../views/home/components/SalesList/hooks/useAuctionsList';
//import { SpotlightRenderCard } from '../SpotlightRenderCard';
import { ArtContent } from '../ArtContent';
//import { ArtThumb } from '../ArtContent';
import { useAuctionCountdown } from '../../hooks/useAuctionCountdown';
import { useAuctionStatus } from '../AuctionRenderCard/hooks/useAuctionStatus';
import { MetaAvatar } from '../MetaAvatar';
import { ThreeDots } from '../MyLoader';

const filterAuctionList = (sales) => {
  console.log("auctions from filterAuctionList ", sales)
  //remove instant sales from the list

  const filteredAuctions = sales.filter(
    sale =>
      sale.isInstantSale === false &&
      //check the bids array
      Object.keys(sale.auction.info.bidState.bids).length > 0
  );
  const filteredISales = sales.filter(
    sale =>
      sale.isInstantSale === true
    //for now will only render
  );
  console.log("filteredISales ", filteredISales)
  // filter by bid count OK
  // filter by latest bid amount NOK

  const highestBid = filteredAuctions.reduce(
    (acc, state) =>
      // bid count
      acc = acc > Object.keys(state.auction.info.bidState.bids).length ? acc : state, 0);
  // bid highest >  state.auction.info.bidState.bids["lastest"]
  console.log("highestBid ", highestBid)
  if (highestBid.auctionDataExtended != undefined) {
    if (highestBid === undefined) {
      // no highest 
      console.log("**** highestBid === undefined : ", highestBid)
    } else {
      return highestBid;
    }
  } else {
    return filteredISales[0]
  }
}

const Countdown = ({ state }: { state?: CountdownState }) => {
  let localState = state;
  if (!localState) {
    localState = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  return (
    <div
      style={{ width: '100%', flexWrap: 'nowrap', display: 'flex' }}
      className={'no-label-cd'}
    >
      {localState.days > 0 && (
        <div className="cd-number">
          {localState.days}
          <span style={{ opacity: 0.5 }}>d</span>
        </div>
      )}
      <div className="cd-number">
        {localState.hours}
        <span style={{ opacity: 0.5 }}>h</span>
      </div>
      <div className="cd-number">
        {localState.minutes}
        <span style={{ opacity: 0.5 }}>m</span>
      </div>
      {!localState.days && (
        <div className="cd-number">
          {localState.seconds}
          <span style={{ opacity: 0.5 }}>s</span>
        </div>
      )}
    </div>
  );
};

export const spotLightThumb = () => {
  // will return thumbnail url (safestore)
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { auctions } = useAuctionsList(activeKey);
  const mostBidded = filterAuctionList(auctions);
  const [Pubkey, setPubkey] = useState();
  useEffect(() => {

    if (mostBidded != undefined) {
      if (Pubkey != undefined) {
      } else {
        try {
          var id = mostBidded.thumbnail.metadata.pubkey;
          setPubkey(id)
        } catch (e) {
          console.log("id err ", e)
        }
      }
    }
  }, [mostBidded])

  const { data } = useExtendedArtNoRef(Pubkey);

  if (data?.image != undefined) {
    //console.log("data?.image : ", data?.image)
    return data?.image;
  }
}

const SpotlightCardRender = (props: {
  spotlightView: AuctionView;
}) => {
  const { spotlightView } = props;

  if (Object.prototype.toString.call(spotlightView) != '[object Object]') {
    // had to make this condition, at first load this prop is not an object, could lead to unknown
    return (
      <>
        <div style={{
          textAlign: 'left', alignItems: 'center',
          fontSize: 18,
          fontWeight: 600,
          maxWidth: 400,
          margin: 'auto',
          paddingBottom: 13,
          color: 'white',
          textTransform: 'uppercase',
        }}>
          <div className='hot-sale-wrapper-fx'>
            <div style={{ visibility: 'hidden' }}>Hot auction</div>
          </div>
        </div>
        <div style={{ borderRadius: '6px', margin: 'auto', height: 380, maxWidth: 400, backgroundColor: 'white' }}>
          <ThreeDots />
        </div>
      </>
    )
  } else {
    //const { status, amount } = useAuctionStatus(spotlightView);
    const state = useAuctionCountdown(spotlightView);
    const crea = useCreators(spotlightView)
    //console.log("useCreators  ", crea)
    const id = spotlightView.thumbnail.metadata.pubkey;
    const isInstantSale = spotlightView.isInstantSale;
    console.log("isInstantSale", spotlightView)
    // the wholes data are ditributed to <ArtContent> comp
    return (
      <>
        <div style={{
          margin: 'auto'
        }}>
          <div style={{
            textAlign: 'left', alignItems: 'center',
            fontSize: 55,
            fontWeight: 600,
            paddingBottom: 13,
            color: 'white',
            textTransform: 'uppercase',
            position: 'absolute',
            right: 0,
            top: 0,
            filter: 'opacity(0.5)',
            display: 'none'
          }}>Live auction</div>

          <Link to={`/auction/${spotlightView.auction.pubkey}`}>
            <div style={{
              textAlign: 'left', alignItems: 'center',
              fontSize: 18,
              fontWeight: 600,
              maxWidth: 400,
              margin: 'auto',
              paddingBottom: 13,
              color: 'white',
              textTransform: 'uppercase',
            }}>

              <div className='hot-sale-wrapper-fx'>
                <div className='hot-sale-fx'>Hot {isInstantSale ? <> sale</> : <>auction</>}</div>
              </div>
            </div>
            <div className='spotlight-wrapper' style={{ borderRadius: '6px', margin: 'auto', height: 380, maxWidth: 400, backgroundColor: 'white', boxShadow: 'rgb(0 0 0 / 29%) 0px 8px 24px' }}>

              <div style={{ height: '80%', overflow: 'hidden', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                <div className='spotlight-gradient-info' ></div>
                <ArtContent
                  style={{
                    minWidth: '150%',
                    left: '-25%',
                    alignSelf:'center'
                  }}
                  className="spotlight no-events"
                  preview={true}
                  pubkey={id}
                  allowMeshRender={false}
                  isSpotlight={true}
                />
              </div>
              <div style={{ height: '20%' }}>
                <div style={{ display: 'flex', height: '100%', padding: '10px 30px 10px 30px' }}>
                  <div style={{ width: '50%', textAlign: 'left', alignSelf: 'center', color: 'black' }}>
                    <div style={{ fontSize: 'smaller' }}>ARTIST</div>
                    <div style={{ fontSize: 'larger', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                      <MetaAvatar
                        size={25}
                        creators={crea.length ? [crea[0]] : undefined}
                      />
                      <span style={{ paddingLeft: 8 }}>{crea[0]?.name}</span>
                    </div>
                  </div>
                  {isInstantSale ?
                    <>
                    </>
                    :
                      <div style={{ width: '50%', textAlign: 'left', alignSelf: 'center', color: 'black' }}>
                        <div style={{ fontSize: 'smaller' }}>AUCTION ENDS</div>
                        <div>
                          <Countdown state={state} />
                        </div>
                      </div>
                    }
                </div>
              </div>
            </div>
          </Link>
        </div>
      </>)
  }
}

export const SpotlightCard = () => {
  // TODO: add props for mobile ^
  // TODO: handle if no live auctions
  // TODO: improve into carousel to show an instant sales
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { auctions } = useAuctionsList(activeKey);
  const mostBidded = filterAuctionList(auctions);
  console.log('mostBidded from SpotlightCard ', mostBidded)
  // if mostbidden = undefined = show loader
  return (<SpotlightCardRender spotlightView={mostBidded} />)
}