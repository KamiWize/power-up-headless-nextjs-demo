'use client';
import Script from 'next/script';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography } from '@mui/material';

const AD_EXAMPLE =
  'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

type ArticleBodyProps = {
  elements: Array<any>;
};

export default function ArticleBody({ elements }: ArticleBodyProps) {
  const onLoadPowa = () => {
    window.PoWaSettings.colors = window.PoWaSettings.colors || {};
    window.PoWaSettings.colors.accent = {
      red: 52,
      green: 235,
      blue: 189,
    };

    window.PoWaSettings.advertising = window.PoWaSettings.advertising || {};
    window.PoWaSettings.advertising.adTag = AD_EXAMPLE;
    window.PoWaSettings.advertising.adBar = {
      // enable play/pause control
      playControl: true,
      // enable mute/unmute control
      muteControl: true,
      // enable ad countdown
      adCountdown: true,
      // enable skip control
      skipControl: true,
      // allow user to skip after N seconds
      skipOffset: 5,
      // fudge factor to prevent showing 'skip' for ads slightly longer than skipOffset
      skipThreshold: 2,
      // text displayed on 'skip control'
      adSkipText: 'Skip',
      // receives {duration, elapsed, remaining, skipOffset, skipThreshold}
      adCountdownTemplate: (timing: any) =>
        `This ad will end in ${Math.ceil(timing.remaining)} seconds`,
      // receives {duration, elapsed, remaining, skipOffset, skipThreshold}
      adSkipCountdownTemplate: (timing: any) =>
        `You can skip this ad in ${Math.ceil(
          timing.skipOffset - (timing.duration - timing.remaining)
        )} seconds`,
      // ensure countdowns aren't too long, else, hide them
      // receives object of all ad bar elements wrapped in PoWaPack objects
      checkSizing: (adBarElements: any) => {
        const $controls = adBarElements.$controls;
        const $countdown = adBarElements.$countdown;
        const $skipContainer = adBarElements.$skipContainer;
        const $skipCountdown = adBarElements.$skipCountdown;

        const adControlsRight = $controls.position().left + $controls.width();
        const adCountdownRight =
          $countdown.position().left + $countdown.width();
        const adSkipContainerLeft = $skipContainer.position().left;

        if (adCountdownRight > adSkipContainerLeft) {
          console.log('adCountdownRight > adSkipContainerLeft');
          $countdown.addClass('powa-bar-hide');
        }

        if (adControlsRight > adSkipContainerLeft) {
          console.log('adControlsRight > adSkipContainerLeft');
          $skipCountdown.addClass('powa-bar-hide');
        }
      },
      // receives adBar = {height, width}, player = {fullscreen, height, width}
      shrinkAd: (adBar: any, player: any) => {
        const sides = (adBar.height * (player.width / player.height)) / 2;

        return {
          top: adBar.height,
          bottom: 0,
          left: sides,
          right: sides,

          height: player.height - adBar.height,
          width: player.width - 2 * sides,
        };
      },
      // receives {top, bottom, left, right, height, width} (from shrinkAd)
      shrinkAdCSS: (shrinkBy: any) => {
        return {
          top: `${shrinkBy.top}px`,
          left: `${shrinkBy.left}px`,
          width: `${shrinkBy.width}px`,
          height: `${shrinkBy.height}px`,
        };
      },
      style: (config: any) => `
         .powa-sell-bar {
              position: absolute;
              top: 0px;
              left: 0px;

              width: 100%;
              height: 22px;

              display: flex;
              align-items: center;
              justify-content: flex-start;

              pointer-events: auto;
              font-family: Helvetica;

              color: rgb(240, 248, 255);
              background-color: rgba(0, 0, 0, 0.7);

              z-index: 2;
         }

         .powa-sell-bar-controls {
              display: flex;
              align-items: center;
              justify-content: flex-start;

              margin: 0;
              padding: 0;
         }

         .powa-sell-bar-control {
              display: flex;
              align-items: center;
              justify-content: center;

              width: 20px;
         }

         .powa-sell-bar-control:active {
              color: rgb(153, 50, 204);
         }

         .powa-sell-bar-countdown {
              font-size: 14px;
              font-weight: 400;
              line-height: normal;
              margin: 0 3px 0 3px;
              padding: 0;
         }

         .powa-sell-bar-skip-container {
              position: absolute;
              right: 0px;

              display: flex;
              justify-content: flex-end;

              padding: 0 3px 0 3px;
         }

         .powa-sell-bar-skip-countdown {
              font-size: 14px;
              font-weight: 400;
              line-height: normal;
              margin: 0;
              padding: 0;
         }

         .powa-sell-bar-skip {
              font-size: 14px;
              font-weight: 400;
              cursor: pointer;
              line-height: normal;
              margin: 0;
              padding: 0;
         }

         .powa-sell-bar-skip:hover {
              text-decoration: underline;
         }

         .powa-sell-bar-skip:active {
              color: rgb(153, 50, 204);
         }

         .powa-sell-bar-hidden {
              display: none;
         }
    `,
      template: (config: any) => `
         <div class="powa-sell-bar">
              <span class="powa-sell-bar-controls">
                    <span class="powa-sell-bar-control powa-sell-bar-play-pause powa-click-play-pause-click">
                         <span class="powa-sell-bar-play powa-sell-bar-hidden" aria-label="Play"><i class="fa fa-play" aria-hidden="true"></i></span>
                         <span class="powa-sell-bar-pause" aria-label="Pause"><i class="fa fa-pause" aria-hidden="true"></i></span>
                    </span>
                    <span class="powa-sell-bar-control powa-sell-bar-mute-unmute powa-click-mute-unmute-click">
                         <span class="powa-sell-bar-mute" aria-label="Mute"><i class="fa fa-volume-up" aria-hidden="true"></i></span>
                         <span class="powa-sell-bar-unmute powa-sell-bar-hidden" aria-label="Unmute"><i class="fa fa-volume-off" aria-hidden="true"></i></span>
                    </span>
              </span>
              <span class="powa-sell-bar-countdown powa-sell-bar-hidden"></span>
              <span class="powa-sell-bar-skip-container">
                    <span class="powa-sell-bar-skip-countdown powa-sell-bar-hidden"></span>
                    <span class="powa-sell-bar-skip powa-click-skip-click powa-sell-bar-hidden">Skip</span>
              </span>
         </div>
    `,
    };
  };

  return (
    <>
      <Script
        src="https://crain.video-player.arcpublishing.com/prod/powa.js?org=crain"
        onLoad={onLoadPowa}
      />
      <Script src="https://crain.video-player.arcpublishing.com/prod/powaBoot.js?org=crain" />
      <Container>
        <Box>
          <Stack spacing={2}>
            <Typography variant="h4">Video Examples</Typography>
            {elements.map((element) => (
              <div
                key={element._id}
                className="powa"
                id={`powa-${element._id}`}
                data-org="crain"
                data-env="sandbox"
                data-uuid={`${element._id}`}
                data-aspect-ratio="0.562"
                data-api="sandbox"
                data-sticky="true"
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
