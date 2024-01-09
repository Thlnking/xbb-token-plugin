
class TokenDBManager {
    constructor() {
        this.db = null;
        this.init();
    }

    init() {
        this.db = {
            allTokens: localStorage.getItem('allTokens') ? JSON.parse(localStorage.getItem('allTokens')) : [],
        }
    }

    saveToken(data, callback) {
        const { allTokens } = this.db;
        if (data) {
            // 如果已经存在就进行覆盖
            const index = allTokens.findIndex((item) => {
                console.log('[  ] >', item.userName === data.userName, item.corpName === data.corpName, item.locationKey === data.locationKey, item.corpid === data.corpid)
                return item.userName === data.userName && item.corpName === data.corpName && item.locationKey === data.locationKey && item.corpid === data.corpid;
            });
            console.log('[ index ] >', index)

            if (index > -1) {
                allTokens[index] = data;
            } else {
                allTokens.push(data);
            }

            localStorage.setItem('allTokens', JSON.stringify(allTokens));
        }
        callback && callback();

    }


    static setCurrentToken(data, callback) {
        if (data) {
            localStorage.setItem('currentToken', JSON.stringify(data));
            callback && callback();
        }
    }

    getTokenList() {
        return this.db.allTokens;
    }

    deleteToken(data, callback) {
        const { allTokens } = this.db;
        if (data) {
            const index = allTokens.findIndex((item) => {
                return item.userName === data.userName && item.corpName === data.corpName && item.location === data.location;
            });
            if (index > -1) {
                allTokens.splice(index, 1);
                localStorage.setItem('allTokens', JSON.stringify(allTokens));
                callback && callback();
            }
        }
    }





}
export default TokenDBManager;