import {UPDATE_DATA,UPDATE_PAGELOADING} from '../actions/home'

const initState = {
    data:{},
    pageLoading: true
}

export const home = (state = initState, action)=> {

    switch (action.type) {
        case UPDATE_DATA:
            return {
                ...state,
                data: action.data
            }
        case UPDATE_PAGELOADING:
            return {
                ...state,
                pageLoading: action.bol
            }
        default:
            return {
                ...state
            }
    }
};