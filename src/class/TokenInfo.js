import {
    copyTextToClipboard
} from '../utils/index.js';


class TokenInfo {
    constructor({
        corpName,
        corpid,
        env,
        location,
        locationKey,
        userId,
        userName,
        xbbAccessToken,
    }) {
        this.corpName = corpName;
        this.corpid = corpid;
        this.env = env;
        this.location = location;
        this.locationKey = locationKey;
        this.userId = userId;
        this.userName = userName;
        this.xbbAccessToken = xbbAccessToken;
    }

    // 生成设置 localStorage 信息的 JavaScript 代码
    generateSetScript(storageType = "localStorage") {
        const script = `Object.entries(${JSON.stringify(
            this
        )}).forEach(([key, value]) => {${storageType}.setItem(key, value); console.log('${storageType} Setting '+[key]+' to', value);})`;
        return script;
    }



    // 复制 当前登录信息 登录脚本 到剪贴板
    static copyScriptToClipboard() {
        const tokenInfo = new TokenInfo({
            ...TokenInfo.getCurrentTokenInfo()
        });
        const script = tokenInfo.generateSetScript();
        copyTextToClipboard(script);
    }

    // 获取当前 Token 信息
    static getCurrentTokenInfo() {
        const keysToRetrieve = ['corpName', 'corpid', 'env', 'location', 'locationKey', 'userId', 'userName', 'xbbAccessToken'];
        const storedInfo = {};

        keysToRetrieve.forEach((key) => {
            const value = localStorage.getItem(key);
            if (value !== null) {
                storedInfo[key] = value;
            }
        });

        return storedInfo;
    }

    // 复制当前 Token 信息到剪贴板
    static copyCurrentTokenInfoToClipboard() {
        const tokenInfo = TokenInfo.getCurrentTokenInfo();
        copyTextToClipboard(JSON.stringify(tokenInfo));
    }
}

export default TokenInfo;
