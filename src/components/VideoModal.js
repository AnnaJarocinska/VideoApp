import React from "react";
import "./VideoModal.css";

const VideoModal = ({ src, title, close }) => (
  <div>
    <iframe className="video-modal" title={title} type="text/html" width="640" height="360" src={src} />
    <button onClick={() => close(null)}>x</button>
  </div>
);

export default VideoModal;
