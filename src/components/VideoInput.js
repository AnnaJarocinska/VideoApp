import React from "react";
import '../styles/VideoInput.css';

const VideoInput = ({ getVideo, setVideoId, videoId }) => (
  <div className="video-input">
    <input onChange={(e) => setVideoId(e.target.value)} value={videoId}></input>
    <button onClick={getVideo}>+ Add video</button>
  </div>
);

export default VideoInput;
