import React, {useState} from 'react';
import ReactTooltip from 'react-tooltip';

import {useLocalStorage} from './hooks/useLocalStorage/useLocalSrotage';
import VideoApp from './components/videoApp/VideoApp';
import Theme from './components/theme/Theme';

function App() {
    const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);
    const [showTooltip, setShowTooltip] = useState(true);

    const hideTooltip = () => {
        setShowTooltip(false);
        setTimeout(() => setShowTooltip(true), 50);
    }

    return (
        <Theme darkMode={darkMode}>
            <div className='App'>
                <VideoApp darkMode={darkMode} setDarkMode={setDarkMode} setShowTooltip={setShowTooltip}
                          hideTooltip={hideTooltip}/>
                {showTooltip && <ReactTooltip/>}
            </div>
        </Theme>
    );
}

export default App;
