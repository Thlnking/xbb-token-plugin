
class TokenDBManager {
    constructor(databaseName = 'xbbTokenDB', version = 1, storeName = 'tokenStore') {
        this.databaseName = databaseName;
        this.version = version;
        this.storeName = storeName;
        this.db = null; // 用于存储打开的数据库引用
        this.store = null; // 用于存储数据表对象
        this.initPromise = null; // 不在构造函数中调用 init 方法
        this.init(); // 在构造函数中调用一次 init 方法
    }

    // 初始化 IndexedDB，打开数据库
    init() {
        if (!this.initPromise) {
            this.initPromise = new Promise((resolve, reject) => {
                const request = indexedDB.open(this.databaseName, this.version);

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                };

                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    this.store = this.db.transaction([this.storeName], 'readwrite').objectStore(this.storeName);
                    resolve();
                };

                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }

        return this.initPromise;
    }

    // 获取数据表
    async getStore(mode = 'readonly') {
        await this.init(); // 确保初始化完成

        if (!this.db || !this.store) {
            throw new Error('IndexedDB not initialized. Call init() first.');
        }

        return mode === 'readwrite' ? this.db.transaction([this.storeName], mode).objectStore(this.storeName) : this.store;
    }
}
export default TokenDBManager;