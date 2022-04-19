import React from "react";
import { useState } from "react";
import moment from "moment";
import { sampleVideosList } from "../utils/SampleVideosList";
import VideoModal from "./VideoModal";

const VideoList = ({ videoList, setVideoList }) => {
  const [watch, setWatch] = useState(false);
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  return (
    <>
      {(onlyFavourites ? videoList.filter((v) => v.favourite) : videoList)?.map(
        (video) => (
          <>
            <div>
              <p>Number of views: {video.viewsNumber}</p>
              <p>Number of likes: {video.likesNumber}</p>
              <p>Title: {video.title}</p>
              <img
                src={video.thumbnail}
                alt={video.title}
                onClick={() => setWatch(video.videoId)}
              />
              <p>
                Date added to the app:{" "}
                {video.addingToAppDate?.format("LLLL").toString()}
              </p>
              <p>{video.favourite && "like"}</p>
              <button onClick={() => setWatch(video.videoId)}>watch</button>
              <button
                onClick={() => {
                  setVideoList(
                    [...videoList].filter((v) => v.videoId !== video.videoId)
                  );
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  let list = [...videoList];
                  let index = [...videoList].findIndex(
                    (v) => v.videoId === video.videoId
                  );
                  list[index].favourite = !list[index].favourite;
                  setVideoList(list);
                }}
              >
                like/dislike
              </button>
            </div>
            {watch === video.videoId && (
              <VideoModal videoId={video.videoId} close={setWatch} />
            )}
            {videoList.length > 0 && (
              <>
                <button>kafelki</button>
                <button>lista</button>
                <button onClick={() => setVideoList([])}>reset list</button>
                <button onClick={() => setOnlyFavourites(!onlyFavourites)}>
                  only favourites
                </button>
                <button
                  onClick={() =>
                    setVideoList(
                      [...videoList].sort(function (a, b) {
                        return b.addingToLibraryDate - a.addingToLibraryDate;
                      })
                    )
                  }
                >
                  sort by date
                </button>
              </>
            )}
          </>
        )
      )}
      <button
        onClick={() => {
          const sampleVideosListWithDate = sampleVideosList.map((v) => ({
            ...v,
            addingToAppDate: moment(),
          }));
          setVideoList([...videoList, ...sampleVideosListWithDate]);
        }}
      >
        upload a sample movies list
      </button>
    </>
  );
};

export default VideoList;
