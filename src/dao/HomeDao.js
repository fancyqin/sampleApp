import BaseDao from './BaseDao';

class Home extends BaseDao{
    constructor(){
        super()
    }
    getLatestLaunch(){
        return this.request({
            url:'/launches/latest',
            method:'GET',
        })
    }
}

export default new Home()