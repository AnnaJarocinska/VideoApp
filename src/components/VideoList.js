import React from "react";
import { useState } from "react";
import moment from "moment";
import { sampleVideosList } from "../utils/SampleVideosList";
import {
  faList,
  faTableCells,
  faRotateLeft,
  faStar,
  faCaretUp,
  faDatabase,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./VideoList.css";
import VideoItem from "./VideoItem";
import classNames from 'classnames';

const VideoList = ({ videoList, setVideoList }) => {
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [display, setDisplay] = useState("cells");
  const [sort, setSort] = useState(false);
  const [sampleListAdded, setSampleListAdded] = useState(false);
  const [pagination, setPagination] = useState({currentPage: 1,
  videosPerPage: 2});

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(videoList.length / pagination.videosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <span
        key={number}
        className={classNames({"active": number === pagination.currentPage})}
        id={number}
        onClick={(e)=> {
          setPagination({
            ...pagination,
            currentPage: Number(e.target.id)
          });
        }}
      >
        {number}
      </span>
    );
  });

 
  const indexOfLastVideo = pagination.currentPage * pagination.videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - pagination.videosPerPage;
  const renderVideoList = videoList.slice(indexOfFirstVideo, indexOfLastVideo);

 

  return (
    <div className="video-list">
<div className="list-icons">
{videoList.length > 0 && <>
        
          <FontAwesomeIcon onClick ={()=>setDisplay("list")} icon={faList} className={classNames("icon", {"active": display === "list"})} />
          <FontAwesomeIcon onClick ={()=>setDisplay("cells")} icon={faTableCells} className={classNames("icon", {"active": display === "cells"})}/>
          <FontAwesomeIcon 
          className={classNames("icon", {"rotate": sort})}
          onClick={() =>{
              setVideoList(
                [...videoList].sort((a, b)=>{
                 const prev = moment(a.addingToLibraryDate) 
                 const next = moment(b.addingToLibraryDate);
                  return prev > next ? 1 : -1;  
                })
              )
              setSort(!sort)
            }} icon={faCaretUp} />
      
          <FontAwesomeIcon onClick={() => setVideoList([])} icon={faRotateLeft} className="icon"/>
          <FontAwesomeIcon onClick={() => setOnlyFavourites(!onlyFavourites)} icon={faStar} className={classNames("icon", {"active": onlyFavourites})}/>
          </>}
          <FontAwesomeIcon  onClick={() => { 
          const sampleVideosListWithDate = sampleVideosList.map((v) => ({
            ...v,
            addingToAppDate: moment().format("LLL"),
          }));
          !sampleListAdded &&  setVideoList([...videoList, ...sampleVideosListWithDate]);
          setSampleListAdded(true);
          }
        
        } icon={faDatabase} 
        className={classNames("icon sample", {"disabled":sampleListAdded})}/>
        </div>
      
    <div className={classNames({"list": display === "list"}, {"cells": display=== "cells"})}>


      {(onlyFavourites ? renderVideoList.filter(v=>v.favourite) : renderVideoList)?.map((video, index) => (
        <VideoItem
          key={video.title + index}
          video={video}
          videoList={videoList}
          setVideoList={setVideoList}
          display={display}
        />
      ))}
</div>
  
{videoList.length > 0 && <div className="pagination">
<FontAwesomeIcon icon={faAngleLeft} onClick={()=> setPagination({
            ...pagination,
            currentPage: pagination.currentPage === 1 ? 1 :pagination.currentPage - 1
          })}/>
          {renderPageNumbers}
          <FontAwesomeIcon icon={faAngleRight} disabled onClick={ ()=> setPagination({
            ...pagination,
            currentPage: pagination.currentPage === pageNumbers.length ? pageNumbers.length :pagination.currentPage + 1
          })
          }
          />
        </div>}
  
    </div>
  );
};

export default VideoList;
