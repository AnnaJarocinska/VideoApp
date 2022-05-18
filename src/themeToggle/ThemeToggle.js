import React from 'react';
import classNames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = ({darkMode, setDarkMode, setShowTooltip, hideTooltip}) => {
    return (
        <>
            {!darkMode
                ?
                <FontAwesomeIcon
                    icon={faSun}
                    className={classNames('icon', {active: !darkMode})}
                    onClick={() => {
                        setDarkMode(true);
                        hideTooltip();
                    }}
                    data-tip='Light mode'
                    onMouseEnter={setShowTooltip(true)}
                    onMouseLeave={hideTooltip}
                />
                :
                <FontAwesomeIcon
                    icon={faMoon}
                    className={classNames('icon', {active: darkMode})}
                    onClick={() => {
                        setDarkMode(false);
                        hideTooltip();
                    }}
                    data-tip='Dark mode'
                    onMouseEnter={setShowTooltip(true)}
                    onMouseLeave={hideTooltip}
                />}
        </>
    )
};

export default ThemeToggle;

