import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";
import { useLocalStorage } from "../../utils/Hooks.js";
import Error from "../errors/Error";
import VideoList from "./VideoList";
import VideoInput from "./VideoInput";
import "../../styles/VideoApp.css";

const VideoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [videoList, setVideoList] = useLocalStorage("video-list", []);
  const [error, setError] = useState(null);
  const API_KEY_YT = process.env.REACT_APP_KEY_YT;

  const updateVideoList = (newVideoList) => setVideoList(newVideoList);
  const checkRepetitionsAndAdd = (title, newVideo) => {
    const isNewVidioOnTheList = [...videoList].find((v) => v.title === title);
    if (isNewVidioOnTheList) {
      setError("The video is already in your movies list");
    }
    updateVideoList(_.uniqBy([...videoList, newVideo], "src"));
    setInputValue("");
  };
  const getVideo = () => {
    const vimeoPattern = /[0-9]{5,}/g;
    const ytPattern = /[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]/g;

    if (inputValue.match(ytPattern)) {
      const videoId = inputValue.match(ytPattern);
      fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY_YT}`
      )
        .then(result => {
          return result.json();
        })
        .then(data => {
          const item = data.items[0];
          checkRepetitionsAndAdd(item.snippet.title, {
            videoId: videoId,
            src: `http://www.youtube.com/embed/${item.id}`,
            title: item.snippet.title,
            viewsNumber: item.statistics.viewCount,
            likesNumber: item.statistics.likeCount,
            thumbnail: item.snippet.thumbnails.default.url,
            addingToAppDate: moment().format("LLL"),
            favourite: false
          });
        })
        .catch(error => setError("Error occured. Try again"))
      }
    if (inputValue.match(vimeoPattern)) {
      const videoId = inputValue.match(vimeoPattern);
      fetch(`http://vimeo.com/api/v2/video/${videoId}.json`)
        .then(result => {
          return result.json();
        })
        .then(data => {
          const item = data[0];
          checkRepetitionsAndAdd(item.title, {
            videoId: videoId,
            src: `http://player.vimeo.com/video/${videoId}`,
            title: item.title,
            viewsNumber: item.stats_number_of_plays,
            likesNumber: item.stats_number_of_likes,
            thumbnail: item.thumbnail_small,
            addingToAppDate: moment().format("LLL"),
            favourite: false
          });
        })
        .catch(error => setError("Error occured. Try again"));
    }
  };

  return (
    <>
      <VideoInput
        getVideo={getVideo}
        setVideoId={setInputValue}
        videoId={inputValue}
      />
      <Error message={error} setError={setError} />
      <VideoList
        videoList={videoList}
        setVideoList={updateVideoList}
        setError={setError}
      />
    </>
  );
};

export default VideoApp;
