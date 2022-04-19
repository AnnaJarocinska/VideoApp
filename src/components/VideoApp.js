import { useState } from "react";
import moment from "moment";
import VideoList from "./VideoList";
import VideoInput from "./VideoInput";

const VideoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState(null)
  const API_KEY_YT = process.env.REACT_APP_KEY_YT;

  const getVideo = () => {
    const vimeoPattern = /[0-9]{8,}/g;
    const ytPattern = /[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]/g;

if (inputValue.match(ytPattern)) {
  const videoId = inputValue.match(ytPattern)
 fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY_YT}`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        const item = data.items[0];
        setVideoList([
          ...videoList,
          {
            src: `http://www.youtube.com/embed/${item.id}`,
            title: item.snippet.title,
            viewsNumber: item.statistics.viewCount,
            likesNumber:item.statistics.likeCount,
            thumbnail: item.snippet.thumbnails.default.url,
            addingToAppDate: moment(),
            favourite: false,
          },
        ]);
        setInputValue("");
      })
      .catch(error=>setError(error));
}
if(inputValue.match(vimeoPattern)){
 const videoId = inputValue.match(vimeoPattern)
  fetch(
    `http://vimeo.com/api/v2/video/${videoId}.json`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        const item = data[0]
        setVideoList([
          ...videoList,
          {
            src: item.url,
            title: item.title,
            viewsNumber: item.stats_number_of_plays,
            likesNumber: item.stats_number_of_likes,
            thumbnail: item.thumbnail_small,
            addingToAppDate: moment(),
            favourite: false,
          },
        ]);
        setInputValue("");
        })
        .catch(error=>setError(error));
}
   
  };
  return (
    <div>
      <VideoInput
        getVideo={getVideo}
        setVideoId={setInputValue}
        videoId={inputValue}
      />
      {error}
      <VideoList videoList={videoList} setVideoList={setVideoList} />
    </div>
  );
};

export default VideoApp;
