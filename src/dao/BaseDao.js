import {Alert} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
const qs = require('qs');
const APIVersion = 'v3'
export default class BaseDao {
    constructor() {
        this.baseURL = 'https://api.spacexdata.com/';
    }
    request(requestArgs) {
        return new Promise(async (resolve, reject) => {
            let { url, method, headers, params, data, enctype } = requestArgs;
            //url
            url = this.baseURL + APIVersion + url;
            
            if (params) {
                //序列化query参数
                url = url + '?' + qs.stringify(params, { arrayFormat: 'repeat' });
            }

            try {
                let task = RNFetchBlob.fetch(method, url, {
                    //headers 处理
                    ...headers,
                    'Content-Type': method === 'POST' ? (enctype ? enctype : 'multipart/form-data') :'application/json'
                },data);
                //超时统一处理
                let timer = setTimeout(() => {
                    Alert('Request Over Time')
                }, 60000);
                task.then(res => {
                    timer && clearTimeout(timer);
                    let json = res.json();
                    if(json && json.error){
                        reject(json.error);
                    }else{
                        resolve(json)
                    }
                }).catch(err => {
                    reject(err);
                });
            } catch(err) {
                reject(err);
            }
        });
    }
}