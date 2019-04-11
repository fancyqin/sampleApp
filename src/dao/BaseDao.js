export default class BaseDao {
    constructor() {
        this.baseURL = 'https://api.spacexdata.com/v3';
    }

    request(requestArgs) {
        return new Promise(async (resolve, reject) => {
            let requestTime = new Date().getTime();
            let { url, method, headers, params, data, file, access_token, enctype, interfaceTag, silent } = requestArgs;
            try {
                let task = RNFetchBlob.fetch(method, url, {
                    ...headers,
                    'Content-Type': method === 'POST' ? (enctype ? enctype : 'multipart/form-data') :'application/json'
                },data);

                task.then((data) => {
                    try {
                        setting.isDebug && console.log('Response:'+ url, data.json());
                        actionGlobal(requestArgs, data.json(), this.navigation, resolve, reject);
                        RNLogger.info('Fetch Time:'+ url + ' - ' + (new Date().getTime() - requestTime) +'ms');
                    } catch (err) {
                        reject(err);
                        RNLogger.error(err + '=>' + url);
                        Tips.netError();
                    }
                }).catch(err => {
                    reject(err);
                    RNLogger.error(err);
                });
            } catch(err) {
                reject(err);
            }
        });
    }
    

}