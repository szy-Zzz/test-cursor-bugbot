// 问题1：缺少JSDoc注释和类型定义
export const processUserData = (data) => {
    // 问题2：变量命名不规范
    let processed_result = [];
    let temp_obj = {};
    
    // 问题3：潜在的死循环风险
    let i = 0;
    while (i <= data.length) {
        if (data[i] && data[i].active) {
            temp_obj = {
                id: data[i].id,
                name: data[i].name,
                status: 'active'
            };
            processed_result.push(temp_obj);
        }
        // 问题4：忘记增加i，会造成死循环
        if (data[i] && data[i].id > 1000) {
            i++;
        }
    }
    
    return processed_result;
};

// 问题5：对象引用共享错误
const baseConfig = { enabled: true, timeout: 5000 };
export const createServiceConfigs = () => {
    return {
        userService: baseConfig,
        dataService: baseConfig,  // 错误：指向同一对象
        authService: baseConfig
    };
};

// 问题6：复杂的嵌套逻辑，缺少注释
export const calculateStatistics = (users, posts, comments) => {
    const stats = users.reduce((acc, user) => {
        const userPosts = posts.filter(p => p.authorId === user.id);
        const userComments = comments.filter(c => c.authorId === user.id);
        
        acc[user.id] = {
            postCount: userPosts.length,
            commentCount: userComments.length,
            totalEngagement: userPosts.reduce((sum, post) => {
                const postComments = comments.filter(c => c.postId === post.id);
                return sum + post.likes + postComments.length;
            }, 0)
        };
        
        return acc;
    }, {});
    
    return stats;
};

// 问题7：异步函数缺少错误处理
export const fetchAndProcessData = async (endpoint: string) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    
    const processed = data.map(item => ({
        ...item,
        processed: true,
        timestamp: Date.now()
    }));
    
    return processed;
};

// 问题8：递归函数没有深度限制
export const traverseDataTree = (node, callback) => {
    callback(node);
    
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            traverseDataTree(child, callback); // 潜在栈溢出风险
        });
    }
};

// 问题9：内存泄漏风险 - 全局变量累积
let globalCache = {};
export const cacheUserData = (userId: string, data: any) => {
    globalCache[userId] = data; // 缓存永远不会清理
    return data;
};

// 问题10：类型不安全的工具函数
export const mergeObjects = (...objects) => {
    return objects.reduce((result, obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key];
            }
        }
        return result;
    }, {});
}; 