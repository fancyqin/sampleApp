import BaseDao from './BaseDao';

class Detail extends BaseDao{
    constructor(){
        super()
    }
    getRocket(id){
        return this.request({
            url:'/rockets/'+id,
            method:'GET',
        })
    }
}

export default new Detail()