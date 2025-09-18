// 问题1：缺少类型定义和接口
class UserService {
    // 问题2：硬编码的API地址
    private baseURL = 'http://localhost:3000/api';
    
    // 问题3：构造函数中的内存泄漏风险
    constructor() {
        // 问题4：全局事件监听器没有清理
        window.addEventListener('online', this.handleOnlineStatus);
        window.addEventListener('offline', this.handleOfflineStatus);
    }
    
    // 问题5：方法命名不规范，缺少注释
    async get_user_by_id(user_id) {
        // 问题6：缺少参数验证
        const response = await fetch(`${this.baseURL}/users/${user_id}`);
        // 问题7：没有检查响应状态
        const data = await response.json();
        return data;
    }
    
    // 问题8：复杂的异步操作缺少错误处理
    async createUserWithProfile(userData, profileData) {
        const userResponse = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        const user = await userResponse.json();
        
        const profileResponse = await fetch(`${this.baseURL}/profiles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...profileData,
                userId: user.id
            })
        });
        
        const profile = await profileResponse.json();
        
        return { user, profile };
    }
    
    // 问题9：对象引用共享错误
    private defaultHeaders = { 'Content-Type': 'application/json' };
    
    async batchUpdateUsers(updates) {
        const results = [];
        
        for (let update of updates) {
            // 问题10：在循环中进行网络请求，性能问题
            const response = await fetch(`${this.baseURL}/users/${update.id}`, {
                method: 'PUT',
                headers: this.defaultHeaders, // 所有请求共享同一对象
                body: JSON.stringify(update.data)
            });
            
            results.push(await response.json());
        }
        
        return results;
    }
    
    // 问题11：缺少清理方法
    private handleOnlineStatus = () => {
        console.log('Online');
    };
    
    private handleOfflineStatus = () => {
        console.log('Offline');
    };
    
    // 问题12：静态缓存永远不清理
    private static cache = new Map();
    
    async getUserWithCache(userId) {
        if (UserService.cache.has(userId)) {
            return UserService.cache.get(userId);
        }
        
        const user = await this.get_user_by_id(userId);
        UserService.cache.set(userId, user);
        
        return user;
    }
}

// 问题13：导出单例，但没有提供清理方法
export default new UserService(); 