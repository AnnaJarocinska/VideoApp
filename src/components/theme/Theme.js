import styled, {css} from 'styled-components';

const Theme = styled.div`
${({darkMode}) => darkMode && css`
background-color:black;
height: 150vh;
@media (orientation: landscape) and (max-width: 1000px)
{
    height: 100vw;
}
`}
`
export default Theme;