import { DELETE_TRANSACTION, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS, TRACKER_FAIL, TRACKER_SUCCESS, TRANSACTION_FAIL, TRANSACTION_SUCCESS, UPDATE_TRANSACTION, USER_PRESENT } from "./actionTypes"

const initialState_Login = {
    isLoading: false,
    isError: false,
    isAuth: JSON.parse(localStorage.getItem("Users")) ? true : false,
    users: {}
}
const initialState_Register = {
    isLoading: false,
    isError: false,
    success: false,
    isData: false
}

const initialState_Tracker = {
    data: [],
    isError: false,
    success: false,
}

const initialState_Transaction = {
    items: [],
    isError: false,
    success: false,
}


export const LoginReducer = (state = initialState_Login, action) => {
    switch (action.type) {
        case LOGIN_LOADING:
            return { ...state, isLoading: true, isError: false }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, isError: false, isAuth: true }
        case LOGIN_FAIL:
            return { ...state, isLoading: false, isError: true }
        default:
            return state;
    }
}

export const RegisterReducer = (state = initialState_Register, action) => {
    switch (action.type) {
        case REGISTER_LOADING:
            return { ...state, isLoading: true, isError: false }
        case REGISTER_SUCCESS:
            return { ...state, isLoading: false, isError: false, success: true }
        case REGISTER_FAIL:
            return { ...state, isLoading: false, isError: true, isData: false }
        case USER_PRESENT:
            return { ...state, isData: true }
        default:
            return state;
    }
}

export const TrackerReducer = (state = initialState_Tracker, action) => {
    switch (action.type) {
        case TRACKER_SUCCESS:
            return { ...state, data: action.payload, isError: false, success: true }
        case TRACKER_FAIL:
            return { ...state, isError: true, success: false }
        default:
            return state;
    }
}

export const TransactionReducer = (state = initialState_Transaction, action) => {
    switch (action.type) {
        case TRANSACTION_SUCCESS:
            return { ...state, items: action.payload, isError: false, success: true, }
        case TRANSACTION_FAIL:
            return { ...state, isError: true, success: false }
        case DELETE_TRANSACTION:
            return { ...state, items: state.items.filter((item) => item.id !== action.payload) }
        case UPDATE_TRANSACTION:
            return { ...state, items: state.items.map((item) => item.id === action.payload.id ? action.payload : item) }
        default:
            return state;
    }
}