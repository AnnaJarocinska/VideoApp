import React from "react";
import ReactTooltip from "react-tooltip";
import {useSelector} from 'react-redux';
import VideoApp from './videoApp/VideoApp';
import ThemeToggle from './themeToggle/ThemeToggle';
import Theme from './theme/Theme';

function App() {
    const theme = useSelector(state => state.theme)
    return (
        <Theme darkMode={theme.darkMode}>
            <div className='App'>
                <ThemeToggle/>
                <VideoApp/>
                <ReactTooltip afterShow={()=> setTimeout(ReactTooltip.hide(), 1000)}/>
            </div>
        </Theme>
    );
}

export default App;
