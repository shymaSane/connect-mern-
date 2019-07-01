import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer'

const connectApp = combineReducers({
    registrationReducer
})

export default connectApp