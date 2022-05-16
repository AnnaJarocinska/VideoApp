import React from 'react';
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const ThemeToggle = ({darkMode, setDarkMode}) => {

    return (
        <>
            {!darkMode
                ?
                <FontAwesomeIcon
                    icon={faSun}
                    className={classNames('icon', {active: !darkMode})}
                    onClick={() => setDarkMode(true)}
                    data-tip='Light mode'
                />
                :
                <FontAwesomeIcon
                    icon={faMoon}
                    className={classNames('icon', {active: darkMode})}
                    onClick={() => setDarkMode(false)}
                    data-tip='Dark mode'
                />}
        </>
    )
};

export default ThemeToggle;

