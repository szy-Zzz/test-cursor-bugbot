// 复杂错误组合示例文件
// 展示多种错误类型的组合情况

// ❌ 多重错误组合：ESLint + TypeScript
import { debounce, throttle, isEmpty, cloneDeep } from 'lodash'; // throttle, isEmpty, cloneDeep 未使用
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns'; // parseISO 未使用

// ❌ camelcase + TS2322 + no-unused-vars
const user_profile_settings = { // camelcase 错误
    max_retry_count: "5", // TS2322: string 不能赋值给 number
    api_timeout: true, // TS2322: boolean 不能赋值给 number
    enable_cache: "yes" // TS2322: string 不能赋值给 boolean
};

var global_api_client; // no-var + camelcase + no-unused-vars

// ❌ 复杂的接口和实现错误
interface UserRepository {
    findById(id: number): Promise<User>;
    create(userData: CreateUserData): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}

interface CreateUserData {
    name: string;
    email: string;
    age: number;
    department: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    department: string;
    createdAt: Date;
    updatedAt: Date;
}

// ❌ TS2420: Class incorrectly implements interface + 多种命名错误
class user_repository_impl implements UserRepository { // camelcase 类名
    private api_base_url: string; // camelcase 属性
    private request_timeout: number; // camelcase + prefer-const
    
    constructor(base_url: string) { // camelcase 参数
        this.api_base_url = base_url;
        let timeout_value = 5000; // prefer-const + camelcase + no-unused-vars
        console.log('Repository initialized'); // no-console
    }
    
    // ❌ TS2355: 函数应该返回值但某些路径没有返回
    async findById(user_id: number): Promise<User> { // camelcase 参数
        console.log('Finding user by ID:', user_id); // no-console
        
        if (user_id <= 0) {
            console.error('Invalid user ID'); // no-console
            // 缺少返回语句
        }
        
        try {
            const response = await fetch(`${this.api_base_url}/users/${user_id}`);
            const user_data = await response.json(); // camelcase
            
            // ❌ TS2322: 返回类型不匹配
            return {
                id: user_data.id,
                name: user_data.name,
                email: user_data.email,
                age: user_data.age.toString(), // TS2322: string 不能赋值给 number
                department: user_data.dept, // 可能 undefined
                createdAt: user_data.created_at, // 可能不是 Date 类型
                updatedAt: user_data.updated_at // 可能不是 Date 类型
            };
        } catch (fetch_error) { // camelcase
            console.error('Fetch failed:', fetch_error); // no-console
            throw fetch_error;
        }
    }
    
    // ❌ TS2741: 缺少必需属性 + 参数类型错误
    async create(user_data: any): Promise<User> { // TS2304: 使用 any 类型
        console.log('Creating user:', user_data); // no-console
        
        var validation_result = this.validate_user_data(user_data); // no-var + camelcase
        
        if (!validation_result.is_valid) { // camelcase
            throw new Error('Invalid user data');
        }
        
        // ❌ TS2345: 参数类型不匹配
        const new_user = await this.makeRequest('POST', '/users', {
            name: user_data.name,
            email: user_data.email
            // 缺少 age 和 department 属性
        });
        
        return new_user;
    }
    
    // ❌ 未实现接口要求的方法 - TS2420
    // 缺少 update 和 delete 方法的实现
    
    // ❌ 私有方法的多种错误
    private validate_user_data(data: unknown) { // camelcase 方法名 + unknown 类型处理错误
        console.log('Validating user data'); // no-console
        
        let validation_errors = []; // prefer-const + camelcase
        let is_valid = true; // prefer-const + camelcase
        
        // ❌ TS2571: Object is of type 'unknown'
        if (!data.name) { // 错误：不能直接访问 unknown 类型的属性
            validation_errors.push('Name is required');
            is_valid = false;
        }
        
        if (!data.email) { // 错误：不能直接访问 unknown 类型的属性
            validation_errors.push('Email is required');
            is_valid = false;
        }
        
        return {
            is_valid: is_valid, // camelcase
            errors: validation_errors
        };
    }
    
    // ❌ 未定义的方法调用
    private async makeRequest(method: string, endpoint: string, data?: any) {
        // 调用未定义的全局函数 - no-undef
        return await globalHttpClient.request({
            method,
            url: `${this.api_base_url}${endpoint}`,
            data
        });
    }
}

// ❌ 函数重载错误 + 命名错误
function process_user_data(data: string): string; // camelcase 函数名
function process_user_data(data: number): number;
function process_user_data(data: User[]): User[];
function process_user_data(data: any): any { // TS2304: 使用 any 类型
    console.log('Processing data:', typeof data); // no-console
    
    var processing_result; // no-var + camelcase + no-unused-vars
    
    if (typeof data === 'string') {
        return data.toUpperCase();
    } else if (typeof data === 'number') {
        return data * 2;
    } else if (Array.isArray(data)) {
        // ❌ TS2339: 假设数组元素有不存在的属性
        return data.map(user => ({
            ...user,
            display_name: user.fullName || `${user.firstName} ${user.lastName}` // 属性不存在
        }));
    }
    
    // ❌ TS2355: 某些路径没有返回值
}

// ❌ 泛型约束错误 + 命名错误
interface data_processor<T extends object> { // camelcase 接口名
    process_item(item: T): ProcessedItem<T>; // camelcase 方法名
    validate_item(item: T): boolean; // camelcase 方法名
}

interface ProcessedItem<T> {
    original_data: T; // camelcase 属性
    processed_at: Date; // camelcase 属性
    is_valid: boolean; // camelcase 属性
}

// ❌ TS2344: 类型约束不满足
class string_processor implements data_processor<string> { // camelcase 类名 + TS2344: string 不满足 object 约束
    process_item(item: string): ProcessedItem<string> { // camelcase 方法名
        console.log('Processing string item:', item); // no-console
        
        return {
            original_data: item,
            processed_at: new Date(),
            is_valid: item.length > 0
        };
    }
    
    validate_item(item: string): boolean { // camelcase 方法名
        return typeof item === 'string' && item.trim().length > 0;
    }
}

// ❌ 条件类型错误 + 命名错误
type api_response_type<T> = T extends string // camelcase 类型名
    ? { message: T; status: 'success' }
    : T extends number
    ? { code: T; status: 'error' }
    : { data: T; status: 'unknown' };

// ❌ TS2367: 条件永远为 false
function handle_api_response<T>(response: api_response_type<T>) { // camelcase 函数名
    // 错误的类型守卫
    if (response.status === 'success' && response.status === 'error') {
        console.log('This will never execute'); // no-console
    }
    
    // ❌ TS2339: 属性可能不存在
    console.log(response.message); // 可能不存在 message 属性
    console.log(response.code); // 可能不存在 code 属性
    console.log(response.data); // 可能不存在 data 属性
}

// ❌ 导出错误 + 未使用变量
export const unused_export = 'not used anywhere'; // camelcase + no-unused-vars
var another_unused_var = process_user_data; // no-var + camelcase + no-unused-vars

export { user_repository_impl, string_processor, handle_api_response }; 