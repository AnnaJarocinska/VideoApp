import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import allActions from "../actions";
import './ThemeToggle.scss';

const ThemeToggle = () => {
    const dispatch = useDispatch();

    return (
        <label className="toggle-container"
               data-tip={"Dark mode"}>
            <input type="checkbox" onChange={() => dispatch(allActions.themeActions.toggleDarkMode())}/>
            <span className="toggle"/>
        </label>
    )
};

export default ThemeToggle;


// export default (Component) => ()=> {
//
//     const themeToggle = useSelector(state => state.themeToggle)
//     const dispatch = useDispatch();
//
//     return (props) => (
//         <div style= {{color: themeToggle.darkMode ? 'violet' : 'pink'}}>
//             <button onClick = {()=> {
//                 dispatch(allActions.themeActions.toggleDarkMode())
//                 console.log(themeToggle.darkMode, 'themeToggle')
//             }}>themeToggle</button>
//             <Component {...props} />
//         </div>
//     );
// };

