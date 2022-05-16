import React, {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import VideoApp from './videoApp/VideoApp';
import Theme from './theme/Theme';

function App() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const darkMode = JSON.parse(localStorage.getItem('dark-mode'));
        setDarkMode(darkMode);
    }, []);

    return (
        <Theme darkMode={darkMode}>
            <div className='App'>
                <VideoApp/>
                <ReactTooltip afterShow={() => setTimeout(ReactTooltip.hide(), 1000)}/>
            </div>
        </Theme>
    );
}

export default App;
