import React from "react";

const VideoInput = ({ getVideo, setVideoId, videoId }) => (
  <>
    <input onChange={(e) => setVideoId(e.target.value)} value={videoId}></input>
    <button onClick={getVideo}>get video</button>
  </>
);

export default VideoInput;
