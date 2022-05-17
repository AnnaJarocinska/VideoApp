import React, {useState} from 'react';
import classNames from 'classnames';
import {faHeart, faPlay, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import VideoModal from '../videoModal/VideoModal';
import './VideoItem.scss';
import {toast} from "react-toastify";

const VideoItem = ({video, videoList, setVideoList, display, setShowTooltip, hideTooltip}) => {
    const [watch, setWatch] = useState(false);
    return <>
        <div className={classNames('video-item', {'list': display === 'list'}, {'cells': display === 'cells'})}>
            <img
                src={video.thumbnail}
                alt={video.title}
                onClick={() => setWatch(video.videoId)}
            />
            <div className='details'>
                <p>{video.title}</p>
                {video.viewsNumber && <p>{video.viewsNumber} views</p>}
                <p>{video.likesNumber} likes</p>
                <p>On the list from {video.addingToAppDate}</p>
            </div>
            <div className='icons'>
                <FontAwesomeIcon
                    icon={faPlay}
                    className='icon'
                    onClick={() => {
                        setWatch(video.videoId);
                        hideTooltip();
                    }}
                    data-tip='Watch'
                    onMouseEnter={setShowTooltip(true)}
                    onMouseLeave={hideTooltip}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className='icon'
                    onClick={() => {
                        setVideoList([...videoList].filter((v) => v.videoId !== video.videoId));
                        hideTooltip();
                        toast.warning('Video has been removed', {theme: 'dark'});
                    }}
                    data-tip='Delete'
                    onMouseEnter={setShowTooltip(true)}
                    onMouseLeave={hideTooltip}
                />
                <FontAwesomeIcon
                    icon={faHeart}
                    className={video.favourite ? 'icon active' : 'icon'}
                    onClick={() => {
                        let list = [...videoList];
                        let index = [...videoList].findIndex(v => v.videoId === video.videoId);
                        list[index].favourite = !list[index].favourite;
                        setVideoList(list);
                        hideTooltip();
                    }}
                    data-tip='Like'
                    onMouseEnter={setShowTooltip(true)}
                    onMouseLeave={hideTooltip}
                />
            </div>
        </div>
        {watch === video.videoId && (
            <VideoModal
                key={video.src}
                src={video.src}
                title={video.title}
                close={setWatch}
            />
        )}
    </>
};

export default VideoItem;
