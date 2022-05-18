import React, {useState} from 'react';
import moment from 'moment';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocalStorage} from '../utils/Hooks.js';
import VideoList from '../videoList/VideoList';
import VideoInput from '../videoInput/VideoInput';
import './VideoApp.scss';

const VIMEO = 'vimeo';
const YT = 'yt';

const VideoApp = ({darkMode, setDarkMode, setShowTooltip, hideTooltip}) => {
    const [inputValue, setInputValue] = useState('');
    const [videoList, setVideoList] = useLocalStorage('video-list', []);
    const API_KEY_YT = process.env.REACT_APP_KEY_YT;

    const checkIsSearchedVideoAlreadyOnTheList = (id) => {
        if ([...videoList].find((v) => JSON.stringify(v.videoId) === JSON.stringify(id))) {
            toast.error('The video is already in your movies list', {theme: 'dark'});
            return true;
        }
        return false;
    };

    const updateVideoList = (newVideoList) => setVideoList(newVideoList);

    const videoSource = [{
        name: 'vimeo',
        pattern: /\d{5,}/g,
        get videoId() {
            return inputValue.match(this.pattern);
        },
        get url() {
            return `http://vimeo.com/api/v2/video/${this.videoId}.json`;
        }
    },
        {
            name: 'yt',
            pattern: /[-_0-9A-Za-z]{11}/g,
            get videoId() {
                return inputValue.match(this.pattern);
            },
            get url() {
                return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${this.videoId}&key=${API_KEY_YT}`;
            }
        }
    ].filter(s => s.videoId)?.[0];

    const addNewVideoToTheList = (source, data) => {

        const newVideo = () => {

            if (source === YT) {
                return {
                    videoId: videoSource.videoId,
                    src: `http://www.youtube.com/embed/${data.items[0].id}`,
                    title: data.items[0].snippet.title,
                    viewsNumber: data.items[0].statistics.viewCount,
                    likesNumber: data.items[0].statistics.likeCount,
                    thumbnail: data.items[0].snippet.thumbnails.default.url,
                    addingToAppDate: moment().format('YYYY-MM-DD'),
                    favourite: false
                }
            }

            if (source === VIMEO) {
                return {
                    videoId: videoSource.videoId,
                    src: `http://player.vimeo.com/video/${videoSource.videoId}`,
                    title: data[0].title,
                    viewsNumber: data[0].stats_number_of_plays,
                    likesNumber: data[0].stats_number_of_likes,
                    thumbnail: data[0].thumbnail_small,
                    addingToAppDate: moment().format('YYYY-MM-DD'),
                    favourite: false
                }
            }
        }

        updateVideoList([...videoList, newVideo()]);
        toast.success('New item has been added to the list', {theme: 'dark'});
    }

    const getVideo = () => {
        setInputValue('')

        if (!videoSource) {
            toast.error('No such video was found', {theme: 'dark'})
            return;
        }

        !checkIsSearchedVideoAlreadyOnTheList(videoSource.videoId) &&
        fetch(videoSource.url)
            .then(result => {
                return result.json();
            })
            .then(data => {
                addNewVideoToTheList(videoSource.name, data)
            })
            .catch(error => {
                toast.error('Error occured. Try again', {theme: 'dark'});
            })
    };

    return (
        <>
            <div className='video-app'>
                <VideoInput
                    getVideo={getVideo}
                    setVideoId={setInputValue}
                    videoId={inputValue}
                />
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
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    setShowTooltip={setShowTooltip}
                    hideTooltip={hideTooltip}
                />
            </div>
        </>
    );
};

export default (VideoApp);
