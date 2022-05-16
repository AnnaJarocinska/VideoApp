import React, {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import VideoApp from './videoApp/VideoApp';
import Theme from './theme/Theme';
import {useLocalStorage} from "./utils/Hooks";

function App() {
    const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);

    return (
        <Theme darkMode={darkMode}>
            <div className='App'>
                <VideoApp darkMode={darkMode} setDarkMode={setDarkMode}/>
                <ReactTooltip afterShow={() => setTimeout(ReactTooltip.hide(), 1000)}/>
            </div>
        </Theme>
    );
}

export default App;
