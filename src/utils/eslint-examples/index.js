// 各种ESLint错误示例文件
// 这个文件专门用来展示常见的ESLint错误类型

// ❌ no-unused-vars 错误
import { debounce, throttle, isEmpty } from 'lodash'; // throttle, isEmpty 未使用
const UNUSED_CONSTANT = 'test';
const unused_variable = 'not used';

// ❌ no-var 错误
var global_state = {};
var user_count = 0;

// ❌ camelcase 错误
const user_profile_config = {
    api_endpoint: '/api/users',
    max_retry_count: 3,
    default_timeout: 5000
};

const API_base_URL = 'http://localhost:3000'; // 混合命名
let current_user_id = null; // prefer-const + camelcase

// ❌ prefer-const 错误
let applicationName = 'MyApp'; // 从不重新赋值
let version = '1.0.0'; // 从不重新赋值

// ❌ no-duplicate-imports 错误
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

// 函数定义
function processUserData(user_data, filter_options) { // camelcase 参数
    // ❌ no-console 错误
    console.log('Processing user data:', user_data);
    console.warn('Filter options:', filter_options);
    
    // ❌ no-var 在函数作用域
    var processed_results = [];
    var error_count = 0;
    
    // ❌ prefer-const
    let startTime = Date.now(); // 从不重新赋值
    let endTime = null;
    
    for (var i = 0; i < user_data.length; i++) { // no-var
        var current_item = user_data[i]; // no-var + camelcase
        
        try {
            // ❌ 使用未定义的全局变量 - no-undef
            if (someGlobalConfig.enabled) {
                var processed_item = processItem(current_item); // no-var + camelcase
                processed_results.push(processed_item);
            }
        } catch (error) {
            console.error('Processing error:', error); // no-console
            error_count++;
        }
    }
    
    endTime = Date.now();
    console.log(`Processing completed in ${endTime - startTime}ms`); // no-console
    
    return {
        results: processed_results,
        error_count: error_count, // camelcase
        processing_time: endTime - startTime // camelcase
    };
}

// ❌ 更多camelcase错误
const data_processor = {
    process_batch: function(batch_data) {
        console.log('Processing batch:', batch_data.length); // no-console
        
        var batch_results = []; // no-var + camelcase
        let total_processed = 0; // prefer-const + camelcase
        
        batch_data.forEach(function(data_item, item_index) { // camelcase 参数
            try {
                // 使用未定义函数 - no-undef
                var result = undefinedProcessor(data_item);
                batch_results.push(result);
                total_processed++;
            } catch (processing_error) {
                console.error(`Error at index ${item_index}:`, processing_error); // no-console
            }
        });
        
        return {
            processed_count: total_processed, // camelcase
            results: batch_results
        };
    },
    
    validate_data: function(input_data) { // camelcase
        console.log('Validating data...'); // no-console
        
        var validation_errors = []; // no-var + camelcase
        let is_valid = true; // prefer-const + camelcase
        
        if (!input_data) {
            validation_errors.push('Data is required');
            is_valid = false;
        }
        
        // 使用未定义的全局验证器 - no-undef
        if (globalValidator && !globalValidator.check(input_data)) {
            validation_errors.push('Global validation failed');
            is_valid = false;
        }
        
        return {
            is_valid: is_valid, // camelcase
            errors: validation_errors
        };
    }
};

// ❌ 事件处理函数
function handleUserClick(event, user_id, action_type) { // camelcase 参数
    console.log('User clicked:', user_id, action_type); // no-console
    
    // ❌ no-var 在块级作用域
    if (action_type === 'delete') {
        var confirmation_message = 'Are you sure?'; // no-var + camelcase
        
        // 使用未定义的全局确认函数 - no-undef
        if (confirm(confirmation_message)) {
            console.log('User confirmed deletion'); // no-console
            
            // 调用未定义函数 - no-undef
            deleteUserById(user_id);
        }
    } else if (action_type === 'edit') {
        var edit_mode = true; // no-var + camelcase
        
        // 设置未定义的全局状态 - no-undef
        globalEditState.active = edit_mode;
        globalEditState.user_id = user_id; // camelcase
    }
}

// ❌ 异步函数错误
async function fetchUserProfile(user_id) { // camelcase 参数
    console.log('Fetching profile for user:', user_id); // no-console
    
    let request_options = { // prefer-const + camelcase
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        // 使用未定义的API客户端 - no-undef
        const response = await apiClient.get(`/users/${user_id}`, request_options);
        const user_profile = await response.json(); // camelcase
        
        console.log('Profile fetched successfully:', user_profile); // no-console
        
        return user_profile;
    } catch (fetch_error) { // camelcase
        console.error('Failed to fetch user profile:', fetch_error); // no-console
        
        // 使用未定义的错误处理器 - no-undef
        errorHandler.log(fetch_error);
        
        return null;
    }
}

// ❌ 导出问题
var exported_functions = { // no-var + camelcase + no-unused-vars
    processUserData,
    data_processor,
    handleUserClick,
    fetchUserProfile
};

// 使用debounce避免no-unused-vars，但仍有其他问题
const debouncedSearch = debounce(function(search_term) { // camelcase 参数
    console.log('Searching for:', search_term); // no-console
}, 300);

export { processUserData, data_processor, handleUserClick, fetchUserProfile, debouncedSearch }; 