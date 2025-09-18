import React, { useState, useEffect } from 'react';
import './index.less';

/**
 * 用户资料组件 - 显示用户基本信息、统计数据和帖子列表
 * @param props - 组件属性
 */
interface UserProfileProps {
    userId: string;
    name: string;
    avatar: string;
}

const UserProfile = (props: UserProfileProps) => {
    // 修复：使用camelCase命名规范
    const [userData, setUserData] = useState();
    const [loadingState, setLoadingState] = useState(false);
    
    // 问题3：对象引用共享错误
    const defaultStats = { views: 0, likes: 0 };
    const [userStats, setUserStats] = useState({
        profile: defaultStats,
        posts: defaultStats, // 错误：指向同一对象
        comments: defaultStats
    });
    
    // 问题4：缺少清理函数的useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            fetchUserData();
        }, 5000);
    }, []);
    
    // 问题5：异步函数缺少错误处理
    const fetchUserData = async () => {
        setLoadingState(true);
        const response = await fetch(`/api/users/${props.userId}`);
        const data = await response.json();
        setUserData(data);
        setLoadingState(false);
    };
    
    // 问题6：直接修改state
    const updateUserStats = (type: string, value: number) => {
        userStats[type].views = value;
        setUserStats(userStats);
    };
    
    // 问题7：render中进行昂贵计算
    const processedData = userData ? userData.posts.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10) : [];
    
    return (
        <div className="user_profile_container">
            <div className="profile_header">
                <h1>{props.name}</h1>
                {loadingState ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <img src={props.avatar} alt="avatar" />
                        <div className="user_info">
                            <span>{userData?.email}</span>
                            <span>{userData?.joinDate}</span>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="stats_section">
                {['profile', 'posts', 'comments'].map(statType => (
                    <div key={statType} className="stat_item">
                        <span>{statType}: {userStats[statType].views}</span>
                        <button onClick={() => updateUserStats(statType, Math.random() * 100)}>
                            Update
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="posts_section">
                {processedData.map(post => (
                    <div key={post.id} className="post_item">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <div className="post_meta">
                            <span>{post.author}</span>
                            <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile; 