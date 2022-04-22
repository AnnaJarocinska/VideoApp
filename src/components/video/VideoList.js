import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";
import _ from "lodash";
import {
  faList,
  faTableCells,
  faRotateLeft,
  faStar,
  faCaretUp,
  faDatabase
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sampleVideosList } from "../../utils/SampleVideosList";
import VideoItem from "./VideoItem";
import PageNumbers from "../pagination/PageNumbers";
import "../../styles/VideoList.css";


const VideoList = ({ videoList, setVideoList, setError }) => {
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [favouritesVideoList, setFavouritesVideoList] = useState([]);
  const [display, setDisplay] = useState("cells");
  const [sort, setSort] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    videosPerPage: 2,
  });

  useEffect(() => {
    setFavouritesVideoList(videoList.filter(v => v?.favourite));
    const currentPageAvailable =
      pagination.currentPage <
      favouritesVideoList.length / pagination.videosPerPage;
    if (onlyFavourites && !currentPageAvailable) {
      setPagination({
        ...pagination,
        currentPage: 1,
      });
    }
  }, [onlyFavourites, videoList, favouritesVideoList, pagination]);

  const pageNumbers = [];
  const numberOfPages = Math.ceil((onlyFavourites ? favouritesVideoList : videoList).length / pagination.videosPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }
  const indexOfLastVideo = pagination.currentPage * pagination.videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - pagination.videosPerPage;
  const renderVideoList = (onlyFavourites ? favouritesVideoList : videoList)
  .slice(indexOfFirstVideo, indexOfLastVideo);

  const loadSampleVideoList = () => {
    const sampleVideosListWithDate = sampleVideosList.map(v => ({
      ...v,
      addingToAppDate: moment().format("LLL"),
    }));
    const isNewVidioOnTheList = [...videoList].find(v =>sampleVideosList.map(s => s.src === v.src));
    if (isNewVidioOnTheList && videoList.length !== 0) {
      setError( "The videos from the sample list are already in your movies list");
    }
    setVideoList(_.uniqBy([...videoList, ...sampleVideosListWithDate], "src"));
  };

  const icons = [
    {
      onClick: () => setDisplay("list"),
      icon: faList,
      className: classNames("icon", { active: display === "list" }),
    },
    {
      onClick: () => setDisplay("cells"),
      icon: faTableCells,
      className: classNames("icon", { active: display === "cells" }),
    },
    {
      onClick: () => {
        setVideoList(
          [...videoList].sort((a, b) => {
            const prev = moment(a.addingToLibraryDate);
            const next = moment(b.addingToLibraryDate);
            return prev > next ? 1 : -1;
          })
        );
        setSort(!sort);
      },
      icon: faCaretUp,
      className: classNames("icon", { rotate: sort }),
    },
    {
      onClick: () => setVideoList([]),
      icon: faRotateLeft,
      className: "icon",
    },
    {
      onClick: () => setOnlyFavourites(!onlyFavourites),
      icon: faStar,
      className: classNames("icon", { active: onlyFavourites }),
    },
  ];

  const listIcons = (
    <div className="list-icons">
      {videoList.length !== 0 &&
        icons.map((i, j) => (
          <FontAwesomeIcon
          key={i.icon + j}
            onClick={i.onClick}
            icon={i.icon}
            className={i.className}
          />
        ))}
      <FontAwesomeIcon
        onClick={loadSampleVideoList}
        icon={faDatabase}
        className="icon sample"
      />
    </div>
  );
  
  return (
    <div className="video-list">
      {listIcons}
      <div className={classNames({ list: display === "list" }, { cells: display === "cells" })} >
        {renderVideoList?.map((video, index) => (
          <VideoItem
            key={video.title + index}
            video={video}
            videoList={videoList}
            setVideoList={setVideoList}
            display={display}
          />
        ))}
      </div>
      {videoList.length !== 0 && <PageNumbers pageNumbers={pageNumbers} pagination={pagination} setPagination={setPagination}/>}
    </div>
  );
};

export default VideoList;
