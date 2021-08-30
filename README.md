# HorizontalVideoScroller
React component for interact with 3D rotating videos.
Utilize a video with loop animation to rotate a 3D object utilizing horizontal scroll. You need 'react-video-scroll' installed to use this component.

## Example

```
import './App.css';
import React from "react"

import HorizontalVideoScroller from "./components/HorizontalVideoScroller"

import VideoEpico from "./assets/videos/Garrafa.mp4"

function App() {
  return (
    <HorizontalVideoScroller 
      shownVideo={VideoEpico} 
      playbackRateValue={30} 
      scrollInitialPosition="2000px"
      reversed={true}
    />
  )
}

export default App;

```

## TODO
The algorithm may be reversed. Check that later.
Update the component for accepting VerticalVideoScroller as well.
Import 'react-video-scroll' automatcally.
