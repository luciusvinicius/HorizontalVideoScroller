import React from 'react'
import { VideoScroll } from 'react-video-scroll'
import { useState, useEffect } from 'react'

/**
 * Utilize a video with loop to rotate a 3D objecto utilizing horizontal scroll. You need 'react-video-scroll' installed to use
 * @param {video} shownVideo The video animation that will loop
 * @param {String} videoWidth The width of the shown video (default = "1000px")
 * @param {String} scrollInitialPosition The initial position of the scroller (default = 0)
 * @param {Number} playbackRateValue The frequency of the animation. Higher the value, it'll take more scroll distance to change frames
 * @param {String} initialWrapperWidth The initial width of the Wrapper. (It'll be changing dynamically) (default = "3000px")
 */

const HorizontalVideoScroller = ({shownVideo, videoWidth = "1000px", scrollInitialPosition = "0",  playbackRateValue = 15, initialWrapperWidth = "3000px"}) => {

    useEffect(() => {
      // Initialize the Wrapper with a fixed width
      let container = document.getElementById("videoContainer");
      container.style.width = initialWrapperWidth;
    }, []);

    const [timesLooped, setTimesLooped] = useState(0);

    const setFrame = (props) => {        
        // Generate animation loop and negates teleports on each loop
        const { duration, playbackRate } = props

        let container = document.getElementById("videoContainer");
        let offset = window.pageXOffset
        let newVal = (offset / (playbackRate)) % duration

        if (offset > timesLooped * 1000) {
          container.style.width = `${parseInt(container.style.width.replace( /^\D+/g, '')) + 1000}px`;
          setTimesLooped(timesLooped+1);
          let scrollPosition = document.getElementById("scrollPosition");
          scrollPosition.scrollIntoView();
        }
        if (offset < (timesLooped - 1) * 1000) {
          container.style.width = `${parseInt(container.style.width.replace( /^\D+/g, '')) - 1000}px`;
          setTimesLooped(timesLooped-1);
          let scrollPosition = document.getElementById("scrollPosition");
          scrollPosition.scrollIntoView();
        }
       
        return newVal;
    }

    const loadHandler = (props) => {
      // Initialize the animation on the position given by scrollInitialPosition 
      let scrollPosition = document.getElementById("scrollPosition");
      scrollPosition.scrollIntoView();
    }

    const scrollHandler = (props) => {
      // Fix the animation on the same position on screen
      const {videoEl , playbackRate } = props
      videoEl.style.marginLeft = `${window.pageXOffset / (playbackRate) * playbackRate}px`
    }

    return (
      <div>
          <div id="videoContainer">
          <VideoScroll
            setCurrentFrame={setFrame}
            onLoad={loadHandler}
            onScroll={scrollHandler}
            playbackRate={playbackRateValue}
            horizontalScroll = {true}
          >
            <video
              id="videoScroll"
              tabIndex="0"
              autobuffer="autobuffer"
              preload="preload"
              style={{ width: videoWidth, objectFit: 'contain' }}
              playsInline
            >
              <source  type="video/mp4" src={shownVideo} />
            </video>
            <div id="scrollPosition" style={{marginLeft: scrollInitialPosition}}></div>
          </VideoScroll>
        </div>
      </div>
      )
  }

export default HorizontalVideoScroller;