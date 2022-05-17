import React, {useState, useEffect} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {uniqBy} from 'lodash-es';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {faList, faTableCells, faRotateLeft, faStar, faCaretUp, faDatabase} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import VideoItem from '../videoItem/VideoItem';
import PageNumbers from '../pagination/PageNumbers';
import {sampleVideosList} from '../utils/SampleVideosList';
import './VideoList.scss';
import ThemeToggle from '../themeToggle/ThemeToggle';
import ListMessage from '../listMessage/listMessage';
import TodayIcon from '@mui/icons-material/Today';

const VideoList = ({videoList, setVideoList, darkMode, setDarkMode, setShowTooltip, hideTooltip}) => {
    const [onlyFavourites, setOnlyFavourites] = useState(false);
    const [favouritesVideoList, setFavouritesVideoList] = useState([]);
    const [display, setDisplay] = useState('cells');
    const [sort, setSort] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        videosPerPage: 2,
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        setFavouritesVideoList(videoList.filter(v => v?.favourite));
        const currentPageAvailable = pagination.currentPage < favouritesVideoList.length / pagination.videosPerPage;

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
    const renderVideoList = (onlyFavourites ? favouritesVideoList : videoList).slice(indexOfFirstVideo, indexOfLastVideo);

    const loadSampleVideoList = () => {

        const sampleVideosListWithDate = sampleVideosList.map(v => ({
            ...v,
            addingToAppDate: moment().format('LLL'),
        }));

        const isNewVideoOnTheList = [...videoList].find(v => sampleVideosList.map(s => s.src === v.src));

        if (isNewVideoOnTheList && videoList.length >= sampleVideosList.length) {
            toast.error('The videos from the sample list are already in your movies list', {theme: 'dark'});
        }
        if (isNewVideoOnTheList && videoList.length < sampleVideosList.length) {
            toast.info('Some videos on the sample list are already on your list, so only the rest has been added', {theme: 'dark'});
        }
        setVideoList(uniqBy([...videoList, ...sampleVideosListWithDate], 'src'));
    };

    const icons = [
        {
            onClick: () => {
                setDisplay('list');
                hideTooltip();
            },
            icon: faList,
            className: classNames('icon', {active: display === 'list'}),
            name: 'List'
        },
        {
            onClick: () => {
                setDisplay('cells');
                hideTooltip();
            },
            icon: faTableCells,
            className: classNames('icon', {active: display === 'cells'}),
            name: 'Cells'
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
                hideTooltip();
            },
            icon: faCaretUp,
            className: classNames('icon', {rotate: sort}),
            name: 'Sort by date added'
        },
        {
            onClick: () => {
                setVideoList([]);
                hideTooltip();
            },
            icon: faRotateLeft,
            className: 'icon',
            name: 'Reset list'
        },
        {
            onClick: () => {
                setOnlyFavourites(!onlyFavourites);
                hideTooltip();
            },
            icon: faStar,
            className: classNames('icon', {active: onlyFavourites}),
            name: 'Show only favourites',
        },
    ];

    const listIcons = (
        <div className='list-icons'>
            {videoList.length !== 0 && icons.map((i, j) => (
                <FontAwesomeIcon
                    key={i.icon + j}
                    onClick={i.onClick}
                    icon={i.icon}
                    className={i.className}
                    data-tip={i.name}
                    onMouseEnter={setShowTooltip(true)}
                    onMouseLeave={hideTooltip}
                />
            ))}
            <FontAwesomeIcon
                onClick={loadSampleVideoList}
                icon={faDatabase}
                className='icon'
                data-tip='Load sample video list'
                onMouseEnter={setShowTooltip(true)}
                onMouseLeave={hideTooltip}
            />
            <ThemeToggle
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setShowTooltip={setShowTooltip}
                hideTooltip={hideTooltip}
            />
            <TodayIcon
                className='icon'
                onClick={() => {
                    setShowDatePicker(!showDatePicker);
                    hideTooltip();
                }}
                data-tip='Show only videos from date range'
                setShowTooltip={setShowTooltip}
                hideTooltip={hideTooltip}
            />
        </div>
    );

    const message = `You don't have any ${onlyFavourites && videoList.length !== 0 ? 'favourite' : ''} video on your list`;

    return (
        <div className='video-list'>
            {listIcons}

            {renderVideoList.length !== 0 ?
                <>
                    <div className={classNames({list: display === 'list'}, {cells: display === 'cells'})}>
                        {renderVideoList?.map((video, index) => (
                            <VideoItem
                                key={video.title + index}
                                video={video}
                                videoList={videoList}
                                setVideoList={setVideoList}
                                display={display}
                                setShowTooltip={setShowTooltip}
                                hideTooltip={hideTooltip}
                            />
                        ))}
                    </div>

                    <PageNumbers pageNumbers={pageNumbers} pagination={pagination} setPagination={setPagination}/>
                </> :
                <ListMessage> {message} </ListMessage>
            }
        </div>
    );
};

export default VideoList;
