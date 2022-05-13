import user from './user'
import theme from './theme'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    user,
    theme
})

export default rootReducer