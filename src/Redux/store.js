import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { LoginReducer, RegisterReducer, TrackerReducer, TransactionReducer } from './reducer';

const rootReducer = combineReducers({
    transactions: TransactionReducer,
    tracker: TrackerReducer,
    login: LoginReducer,
    register: RegisterReducer
})
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export default store;