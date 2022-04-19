import { useState } from "react";
import moment from "moment";
import VideoList from "./VideoList";
import VideoInput from "./VideoInput";

const VideoApp = () => {
  const [videoId, setVideoId] = useState("");
  const [videoList, setVideoList] = useState([]);

  const API_KEY_YT = process.env.REACT_APP_KEY_YT;

  const getVideo = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY_YT}`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setVideoList([
          ...videoList,
          {
            videoId: data.items[0].id,
            title: data.items[0].snippet.title,
            viewsNumber: data.items[0].statistics.viewCount,
            likesNumber: data.items[0].statistics.likeCount,
            thumbnail: data.items[0].snippet.thumbnails.default.url,
            addingToAppDate: moment(),
            favourite: false,
          },
        ]);
        setVideoId("");
      });
  };
  return (
    <div>
      <VideoInput
        getVideo={getVideo}
        setVideoId={setVideoId}
        videoId={videoId}
      />
      <VideoList videoList={videoList} setVideoList={setVideoList} />
    </div>
  );
};

export default VideoApp;
