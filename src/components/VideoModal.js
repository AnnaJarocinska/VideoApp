import React, { useState, useEffect } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/VideoModal.css";

const VideoModal = ({ src, title, close }) => {
  const [screenSize, getScreenSize] = useState({
    width: window.innerWidth < 640 ? window.innerWidth - 80 : 640,
    height:(window.innerWidth < 640 ? window.innerWidth - 80 : 640) < 640? "auto" : 360,
  });
  const setScreenSize = () => {
    const width = window.innerWidth;
    getScreenSize({
      width: width < 640 ? width - 80 : 640,
      height: (width < 640 ? width - 80 : 640) < 640 ? "auto" : 360,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setScreenSize);
    return () => window.removeEventListener("resize", setScreenSize);
  }, [screenSize]);

  return (
    <div className="video-modal-container">
      <iframe
        className="video-modal"
        title={title}
        width={screenSize.width}
        height={screenSize.height}
        type="text/html"
        src={src}
      />
      <FontAwesomeIcon
        icon={faX}
        className="video-modal-btn"
        onClick={() => close(null)}
      />
    </div>
  );
};

export default VideoModal;
