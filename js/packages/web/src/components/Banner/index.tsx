import React from 'react';
import { useEffect } from 'react';
import { spotLightThumb, SpotlightCard } from '../SpotlightCard';

export const Banner = (props: {
  src: string;
  useBannerBg: boolean;
  headingText: string;
  subHeadingText: string;
  actionComponent?: JSX.Element;
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    const mainBg = document.getElementById('main-bg');
    const gradient = document.getElementById('bg-gradient');
    if (mainBg && props.useBannerBg) {
      mainBg.style.backgroundImage = `url(${props.src})`;
      mainBg.style.display = 'inline-block';
      if (gradient) {
        gradient.style.display = 'inline-block';
      }
    }

    return () => {
      const mainBg = document.getElementById('main-bg');
      const gradient = document.getElementById('bg-gradient');
      if (mainBg && props.useBannerBg) {
        mainBg.style.backgroundImage = '';
        mainBg.style.display = 'none';
      }
      if (gradient) gradient.style.display = 'none';
    };
  }, [props.src, props.useBannerBg]);

  //console.log("HighestBidThumbbbb called from banner ", highestBidThumb())
  return (
    <>
      <div id="mobile-banner">
        {/*<img className="banner-img" src={props.src} />*/}
        <div className="banner-content">
          <div id={'main-heading'}>{props.headingText}</div>
          <div id={'sub-heading'}>{props.subHeadingText}</div>
          {props.actionComponent}
        </div>
      </div>
      <div
        id={'current-banner'}

      >
        <div style={{
          backgroundImage: `url(${spotLightThumb()})`,
          height:'100%',
          backgroundPosition: 'center',
          backgroundSize: '1435px 150%',
          backgroundRepeat: 'no-repeat',
          position:'relative',
          borderRadius:'12px',
          transform: 'scaleX(-1)',
          opacity:'0.5',
          filter: 'brightness(0.5) saturate(0.7)',
        }}></div>
        {/* <div style={{ backdropFilter: 'blur(9px) saturate(70%) contrast(80%) brightness(140%)', height: '100%' }}></div> */}
        <span id={'gradient-banner'}></span>
        <div id="banner-inner" style={{ display: 'flex', backdropFilter: 'blur(6px)', borderRadius:12}}>

          <div id={'message-container'} style={{ flexDirection: 'column', width: '50%' }}>
            <div id={'main-heading'} style={{color:'white'}}>{props.headingText}</div>
            <div id={'sub-heading'} style={{color:'white', opacity:'0.7'}}>{props.subHeadingText}</div>
            {props.actionComponent}
          </div>
          <div style={{ flexDirection: 'column', width: '50%', margin: 'auto', placeItems: 'center', textAlign: 'center' }}>
            <SpotlightCard />
          </div>
          {props.children}
        </div>

      </div>
      <div className="powered-by" style={{ marginLeft: 'auto' }}>
        <span>
          POWERED BY <b>LEDAMINT</b> & <b>SAFECOIN</b>
        </span>
      </div>
    </>
  );
};
