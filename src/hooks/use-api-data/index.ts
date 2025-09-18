import { useState, useEffect, useCallback } from 'react';

// 问题1：缺少类型定义和注释
export const useApiData = (url, options) => {
    // 问题2：变量命名不规范
    const [api_data, setapi_data] = useState();
    const [is_loading, setis_loading] = useState(false);
    const [error_message, seterror_message] = useState();
    
    // 问题3：useEffect依赖项问题
    useEffect(() => {
        fetchData();
    }, [url]); // 缺少options依赖
    
    // 问题4：异步函数缺少错误处理，且没有useCallback优化
    const fetchData = async () => {
        setis_loading(true);
        const response = await fetch(url, options);
        const data = await response.json();
        setapi_data(data);
        setis_loading(false);
    };
    
    // 问题5：内存泄漏 - 没有清理定时器
    useEffect(() => {
        if (options?.polling) {
            const interval = setInterval(() => {
                fetchData();
            }, options.pollingInterval || 5000);
        }
    }, [options]);
    
    return { api_data, is_loading, error_message, refetch: fetchData };
};

// 问题6：复杂的状态管理逻辑，缺少注释
export const useComplexState = (initialData) => {
    const [state, setState] = useState(initialData);
    
    // 问题7：对象引用共享错误
    const defaultActions = { type: 'default', payload: null };
    const [actionHistory, setActionHistory] = useState([
        defaultActions,
        defaultActions, // 错误：指向同一对象
        defaultActions
    ]);
    
    const updateState = useCallback((newData) => {
        // 问题8：直接修改state
        state.data = newData;
        setState(state);
        
        // 问题9：push到数组会修改原数组
        actionHistory.push({
            type: 'update',
            payload: newData,
            timestamp: Date.now()
        });
        setActionHistory(actionHistory);
    }, [state, actionHistory]);
    
    const resetState = () => {
        setState(initialData);
        setActionHistory([]);
    };
    
    return { state, updateState, resetState, actionHistory };
};

// 问题10：自定义Hook中的性能问题
export const useExpensiveCalculation = (data, filters) => {
    // 问题11：每次render都会重新计算
    const processedData = data
        .filter(item => filters.category ? item.category === filters.category : true)
        .filter(item => filters.status ? item.status === filters.status : true)
        .sort((a, b) => b.priority - a.priority)
        .map(item => ({
            ...item,
            calculated: item.value * 1.2 + Math.random() * 100
        }));
    
    return processedData;
}; 