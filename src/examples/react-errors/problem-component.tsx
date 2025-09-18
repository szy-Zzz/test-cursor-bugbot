// React组件错误示例
// 展示React开发中常见的ESLint和TypeScript错误

import React, { useState, useEffect, useCallback } from 'react';
import { debounce, throttle } from 'lodash'; // throttle 未使用

// ❌ 接口定义错误 + 命名错误
interface user_profile_props { // camelcase 接口名
    user_id: number; // camelcase 属性名
    display_name?: string; // camelcase 属性名
    on_user_update?: (user: any) => void; // camelcase 属性名 + any 类型
    theme_settings: {
        primary_color: string; // camelcase 属性名
        font_size: number;
        is_dark_mode: boolean; // camelcase 属性名
    };
}

// ❌ 组件实现的多重错误
const ProblemComponent = (props: any) => { // any 类型
    // ❌ State 命名和类型错误
    const [user_data, setuser_data] = useState(); // camelcase + 函数命名不一致
    const [loading_state, setLoadingState] = useState(false); // camelcase
    const [error_message, setErrorMessage] = useState<string>(); // camelcase
    const [form_values, setFormValues] = useState({
        name: "",
        email: "",
        age: "25" // TS2322: string 应该是 number
    });
    
    // ❌ 未使用的 state
    const [unusedState, setUnusedState] = useState(false);
    
    // ❌ useEffect 错误：缺少依赖项 + console
    useEffect(() => {
        console.log('Component mounted'); // no-console
        
        fetchUserData();
        
        // ❌ 内存泄漏：未清理定时器
        const interval = setInterval(() => {
            console.log('Polling...'); // no-console
            refreshUserData();
        }, 5000);
        
        // 缺少清理函数
    }, []); // 缺少 fetchUserData 和 refreshUserData 依赖
    
    // ❌ 异步函数错误 + 命名错误
    const fetchUserData = async () => {
        console.log('Fetching user data for ID:', props.user_id); // no-console
        
        setLoadingState(true);
        
        try {
            // ❌ 使用未定义的全局变量
            const response = await globalApiClient.get(`/users/${props.user_id}`);
            const userData = await response.json();
            
            // ❌ 直接修改 state（虽然这里是 setter，但演示错误用法）
            setuser_data(userData);
            
            // ❌ TS2339: 访问可能不存在的属性
            console.log('User department:', userData.department.name); // 可能 undefined
            
        } catch (fetch_error) { // camelcase
            console.error('Failed to fetch user:', fetch_error); // no-console
            setErrorMessage(fetch_error.message);
        } finally {
            setLoadingState(false);
        }
    };
    
    // ❌ 未使用 useCallback 优化
    const refreshUserData = () => {
        console.log('Refreshing user data'); // no-console
        fetchUserData();
    };
    
    // ❌ 事件处理函数错误
    const handleFormSubmit = (event: any) => { // any 类型
        event.preventDefault();
        
        console.log('Form submitted:', form_values); // no-console
        
        // ❌ 直接修改 state 对象
        form_values.name = form_values.name.trim();
        form_values.email = form_values.email.toLowerCase();
        
        // ❌ TS2345: 参数类型不匹配
        if (props.on_user_update) {
            props.on_user_update({
                id: props.user_id,
                name: form_values.name,
                email: form_values.email,
                age: form_values.age // TS2322: string 不能赋值给 number
            });
        }
    };
    
    // ❌ 条件渲染错误 + 命名错误
    const render_user_info = () => { // camelcase 函数名
        if (!user_data) {
            return null;
        }
        
        // ❌ TS2339: 属性可能不存在
        return (
            <div className="user_info_section"> {/* camelcase class */}
                <h2>{user_data.full_name || user_data.name}</h2> {/* 可能不存在的属性 */}
                <p>Email: {user_data.email_address}</p> {/* 可能不存在的属性 */}
                <p>Department: {user_data.department.name}</p> {/* 可能 undefined */}
                
                {/* ❌ 内联函数导致重新渲染 */}
                <button onClick={() => {
                    console.log('Edit clicked'); // no-console
                    setFormValues({
                        name: user_data.name,
                        email: user_data.email,
                        age: user_data.age.toString() // 可能类型错误
                    });
                }}>
                    编辑
                </button>
            </div>
        );
    };
    
    // ❌ 复杂的条件逻辑错误
    const get_theme_class = () => { // camelcase 函数名
        var theme_class = 'default'; // no-var + camelcase
        
        // ❌ TS2339: 访问可能不存在的属性
        if (props.theme_settings.is_dark_mode) {
            theme_class = 'dark-theme';
        } else if (props.theme_settings.primary_color === 'blue') {
            theme_class = 'blue-theme';
        }
        
        // ❌ prefer-const
        let additional_classes = ''; // 从不重新赋值
        
        if (loading_state) {
            additional_classes = 'loading';
        }
        
        return `${theme_class} ${additional_classes}`.trim();
    };
    
    // ❌ render 中的性能问题
    const expensive_calculation = user_data ? 
        user_data.posts?.map(post => ({
            ...post,
            word_count: post.content.split(' ').length, // 每次 render 都计算
            read_time: Math.ceil(post.content.split(' ').length / 200) // camelcase + 重复计算
        })) : [];
    
    // ❌ JSX 返回的多重错误
    return (
        <div className={get_theme_class()}>
            {/* 缺少功能区域注释 */}
            <div className="header_section"> {/* camelcase class */}
                <h1>用户资料</h1>
                
                {loading_state && (
                    <div className="loading_indicator"> {/* camelcase class */}
                        加载中...
                    </div>
                )}
                
                {error_message && (
                    <div className="error_display"> {/* camelcase class */}
                        错误：{error_message}
                    </div>
                )}
            </div>
            
            {/* ❌ 条件渲染中的错误 */}
            {user_data && user_data.is_active === true && ( // 冗余的 === true
                <div className="active_user_section"> {/* camelcase class */}
                    {render_user_info()}
                    
                    {/* ❌ 表单处理错误 */}
                    <form onSubmit={handleFormSubmit} className="edit_form"> {/* camelcase class */}
                        <input
                            type="text"
                            value={form_values.name}
                            onChange={(e) => {
                                // ❌ 直接修改 state
                                form_values.name = e.target.value;
                                setFormValues(form_values);
                            }}
                            placeholder="姓名"
                        />
                        
                        <input
                            type="email"
                            value={form_values.email}
                            onChange={(e) => setFormValues({
                                ...form_values,
                                email: e.target.value
                            })}
                            placeholder="邮箱"
                        />
                        
                        {/* ❌ 数字输入的类型处理错误 */}
                        <input
                            type="number"
                            value={form_values.age}
                            onChange={(e) => setFormValues({
                                ...form_values,
                                age: e.target.value // 应该转换为数字
                            })}
                            placeholder="年龄"
                        />
                        
                        <button type="submit">保存</button>
                    </form>
                </div>
            )}
            
            {/* ❌ 列表渲染错误 */}
            <div className="posts_section"> {/* camelcase class */}
                <h3>用户帖子</h3>
                {expensive_calculation.map((post, index) => (
                    <div key={index} className="post_item"> {/* 应该使用 post.id 作为 key */}
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                        <small>
                            字数：{post.word_count} | 阅读时间：{post.read_time}分钟
                        </small>
                        
                        {/* ❌ 内联事件处理函数 */}
                        <button onClick={() => {
                            console.log('Post clicked:', post.id); // no-console
                            // 处理帖子点击
                        }}>
                            查看详情
                        </button>
                    </div>
                ))}
            </div>
            
            {/* ❌ 使用 debounce 但实现错误 */}
            <button onClick={debounce(() => {
                console.log('Debounced action'); // no-console
                refreshUserData();
            }, 300)}>
                刷新数据
            </button>
        </div>
    );
};

// ❌ 导出前的未使用变量
const unused_component_config = { // camelcase + no-unused-vars
    theme: 'light',
    autoRefresh: true
};

export default ProblemComponent; 