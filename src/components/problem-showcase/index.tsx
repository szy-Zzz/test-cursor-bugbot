import React, { useState, useEffect } from 'react';
import { debounce, throttle, isEmpty } from 'lodash'; // throttle, isEmpty 未使用
import { format } from 'date-fns'; // 未使用
import './index.less';

// no-unused-vars 错误 - 未使用的变量
const UNUSED_CONSTANT = 'test';
var global_config = {}; // no-var + camelcase 错误

// camelcase 错误 - 变量命名
const user_profile_data = null;
const API_base_url = 'http://localhost:3000'; // 混合命名风格
let loading_state = false; // prefer-const + camelcase

// 组件定义
const ProblemShowcase = (props) => {
    // camelcase 错误
    const [current_user, setCurrentUser] = useState(null);
    const [error_message, setErrorMessage] = useState('');
    
    // no-unused-vars 错误 - 未使用的state
    const [unusedState, setUnusedState] = useState(false);
    
    // prefer-const 错误
    let componentMounted = true; // 从不重新赋值
    let apiEndpoint = '/api/users'; // 从不重新赋值
    
    // no-console 错误
    console.log('Component rendering');
    
    useEffect(() => {
        console.log('Component mounted'); // no-console
        
        // 直接使用未定义的变量 - no-undef 错误
        if (someGlobalVariable) {
            fetchUserData();
        }
        
        // 修改var变量
        global_config.initialized = true;
        
        return () => {
            console.log('Component unmounting'); // no-console
        };
    }, []); // react-hooks/exhaustive-deps 警告
    
    // 异步函数
    const fetchUserData = async () => {
        try {
            console.log('Fetching user data...'); // no-console
            
            // 使用未定义的全局函数 - no-undef
            const response = await undefinedFetchFunction('/api/user');
            const userData = await response.json();
            
            setCurrentUser(userData);
            loading_state = false; // 直接修改let变量
            
        } catch (error) {
            console.error('Error fetching user:', error); // no-console
            setErrorMessage(error.message);
        }
    };
    
    // 事件处理函数
    const handleUserUpdate = (user_id, new_data) => { // camelcase 参数
        console.log('Updating user:', user_id, new_data); // no-console
        
        // 使用var在块级作用域
        if (user_id) {
            var update_result = null; // no-var + camelcase
            
            try {
                // 直接修改props - 不是ESLint错误但是React反模式
                props.onUserUpdate(user_id, new_data);
                update_result = 'success';
            } catch (err) {
                console.warn('Update failed:', err); // no-console
                update_result = 'failed';
            }
        }
    };
    
    // 重复的导入问题已在文件顶部展示
    
    // render中的问题
    return (
        <div className="problem_showcase"> {/* camelcase class名称 */}
            {/* no-console 在JSX中 */}
            {console.log('Rendering JSX')}
            
            <div className="user_section">
                <h1>用户信息</h1>
                
                {loading_state && ( // 使用let变量
                    <div>加载中...</div>
                )}
                
                {current_user && (
                    <div>
                        <p>用户名：{current_user.name}</p>
                        <p>邮箱：{current_user.email}</p>
                        
                        {/* 事件处理中使用未定义变量 */}
                        <button onClick={() => handleUserUpdate(current_user.id, someUndefinedData)}>
                            更新用户
                        </button>
                    </div>
                )}
                
                {error_message && (
                    <div className="error_message">
                        错误：{error_message}
                    </div>
                )}
            </div>
            
            {/* 使用未使用的debounce函数来避免no-unused-vars */}
            <button onClick={debounce(() => {
                console.log('Debounced click'); // no-console
            }, 300)}>
                防抖按钮
            </button>
        </div>
    );
};

// 导出前的额外问题
var component_name = 'ProblemShowcase'; // no-var + camelcase + no-unused-vars

export default ProblemShowcase; 