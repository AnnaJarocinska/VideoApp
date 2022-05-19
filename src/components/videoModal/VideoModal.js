import React from 'react';
import {useMediaQuery} from 'react-responsive';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';

import './VideoModal.scss';

const VideoModal = ({src, title, close}) => {
    const mobilePortrait = useMediaQuery({maxWidth: 500} && {orientation: 'portrait'});
    const frameWidth = mobilePortrait ? window.innerWidth - 80 : 640;
    const frameHeight = mobilePortrait ? 'auto' : 360;

    return (
        <div className='video-modal-container'>
            <div className='video-modal'>
                <iframe
                    title={title}
                    width={frameWidth}
                    height={frameHeight}
                    type='text/html'
                    src={src}
                />
                <FontAwesomeIcon
                    icon={faX}
                    className='video-modal-button'
                    onClick={() => close(null)}
                />
            </div>
        </div>
    );
};

export default VideoModal;