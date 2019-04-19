import {LOADDATA} from '../actions/home'

const initState = {
    data:{}
}

export const home = (state = initState, action)=> {

    switch (action.type) {
        case LOADDATA:            
            return state
        default:
            return {
                ...state
            }
    }
};