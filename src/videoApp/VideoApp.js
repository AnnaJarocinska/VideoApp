import React, {useState} from 'react';
import moment from 'moment';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoList from '../videoList/VideoList';
import VideoInput from '../videoInput/VideoInput';
import {useLocalStorage} from '../utils/Hooks.js';
import './VideoApp.scss';

const VideoApp = () => {
    const [inputValue, setInputValue] = useState('');
    const [videoList, setVideoList] = useLocalStorage('video-list', []);
    const API_KEY_YT = process.env.REACT_APP_KEY_YT;

    const updateVideoList = (newVideoList) => setVideoList(newVideoList);

    const checkRepetitionsAndAdd = (title, newVideo) => {

        const isNewVideoOnTheList = [...videoList].find((v) => v.title === title);

        if (isNewVideoOnTheList) {
            toast.error('The video is already in your movies list', {theme: 'dark'});
            return
        }

        updateVideoList(_.uniqBy([...videoList, newVideo], 'src'));
        setInputValue('');
        toast.success('Video has been added to the list', {theme: 'dark'});
    };

    const getVideo = () => {
        const vimeoPattern = /\d{5,}/g;
        const ytPattern = /[\dA-Za-z_-]{10}[048AEIMQUYcgkosw]/g;

        const videoSources = [{
            name: 'vimeo',
            pattern: /\d{5,}/g,
            get videoId() {
                return inputValue.match(this.pattern)
            },
            get url() {
                return `http://vimeo.com/api/v2/video/${this.videoId}.json`
            }
        },
            {
                name: 'yt',
                pattern: /[\dA-Za-z_-]{10}[048AEIMQUYcgkosw]/g,
                get videoId() {
                    return inputValue.match(this.pattern)
                },
                get url() {
                    return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${this.videoId}&key=${API_KEY_YT}`
                },
            }
        ]

        videoSources.forEach(vs => {

            if (vs.videoId) {
                fetch(vs.url)
                    .then(result => {
                        return result.json();
                    })
                    .then(data => {

                        if (vs.name === "yt") {

                            const item = data.items[0];

                            checkRepetitionsAndAdd(item.snippet.title, {
                                videoId: vs.videoId,
                                src: `http://www.youtube.com/embed/${item.id}`,
                                title: item.snippet.title,
                                viewsNumber: item.statistics.viewCount,
                                likesNumber: item.statistics.likeCount,
                                thumbnail: item.snippet.thumbnails.default.url,
                                addingToAppDate: moment().format('LLL'),
                                favourite: false
                            });
                        }
                        if (vs.name === "vimeo") {

                            const item = data[0];

                            checkRepetitionsAndAdd(item.title, {
                                videoId: vs.videoId,
                                src: `http://player.vimeo.com/video/${vs.videoId}`,
                                title: item.title,
                                viewsNumber: item.stats_number_of_plays,
                                likesNumber: item.stats_number_of_likes,
                                thumbnail: item.thumbnail_small,
                                addingToAppDate: moment().format('LLL'),
                                favourite: false
                            })
                        }
                    })
                    .catch(error => {
                        toast.error('Error occured. Try again', {theme: 'dark'});
                    })
            }
        })

        if (!inputValue.match(vimeoPattern) && !inputValue.match(ytPattern)) {
            toast.error('No such video was found', {theme: 'dark'})
        }
    };

    return (
        <>
            <div className='video-app'>
                <VideoInput
                    getVideo={getVideo}
                    setVideoId={setInputValue}
                    videoId={inputValue}
                />
                <ReactTooltip/>
                <ToastContainer
                    position='top-center'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover/>
                <VideoList
                    videoList={videoList}
                    setVideoList={updateVideoList}
                />
            </div>
        </>
    );
};

export default VideoApp;
