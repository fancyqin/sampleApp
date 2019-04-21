import HomeDao from '../dao/HomeDao';


export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_PAGELOADING = 'UPDATE_PAGELOADING';

export const updateData = data =>{
    return {
        type: UPDATE_DATA,
        data
    }
}

export const updateLoading = bol =>{
    return {
        type: UPDATE_PAGELOADING,
        bol
    }
}

export const loadData = ()=>{
    return (dispatch,getState) => {
        HomeDao.getLatestLaunch().then(data => {
            dispatch(updateData(data))
            dispatch(updateLoading(false))
        })
    }
}