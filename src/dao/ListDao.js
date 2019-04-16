import BaseDao from './BaseDao';

class List extends BaseDao{
    constructor(){
        super()
    }
    getRocketsList(){
        return this.request({
            url:'/rockets',
            method:'GET',
        })
    }
}

export default new List()