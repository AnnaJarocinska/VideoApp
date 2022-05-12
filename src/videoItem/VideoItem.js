import React, {useState} from 'react';
import classNames from 'classnames';
import {faHeart, faPlay, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import VideoModal from '../videoModal/VideoModal';
import './VideoItem.scss';

const VideoItem = ({video, videoList, setVideoList, display}) => {
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
                    onClick={() => setWatch(video.videoId)}
                    data-tip='Watch'
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className='icon'
                    onClick={() =>
                        setVideoList(
                            [...videoList].filter((v) => v.videoId !== video.videoId)
                        )
                    }
                    data-tip='Delete'
                />
                <FontAwesomeIcon
                    icon={faHeart}
                    className={video.favourite ? 'icon active' : 'icon'}
                    onClick={() => {
                        let list = [...videoList];
                        let index = [...videoList].findIndex(v => v.videoId === video.videoId);
                        list[index].favourite = !list[index].favourite;
                        setVideoList(list);
                    }}
                    data-tip='Like'
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
