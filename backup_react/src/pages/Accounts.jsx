import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal, Building2, User } from 'lucide-react';
import { getClinics, getUsers } from '../services/mockData';

const Accounts = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('clinics');
    const [clinics, setClinics] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [clinicsData, usersData] = await Promise.all([getClinics(), getUsers()]);
            setClinics(clinicsData);
            setUsers(usersData);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">アカウント管理</h1>
                    <p className="text-muted text-sm">システム内の全アカウントを一元管理</p>
                </div>
                <button className="btn btn-primary flex items-center gap-2">
                    <Plus size={16} />
                    <span>新規作成</span>
                </button>
            </div>

            <div className="card min-h-[500px] flex flex-col p-0">
                {/* Tabs - Modern Underline Style */}
                <div className="flex border-b border-slate-200 px-6">
                    <button
                        className={`px-6 py-4 font-medium text-sm flex items-center gap-2 transition-all relative ${activeTab === 'clinics'
                                ? 'text-primary-600'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                        onClick={() => setActiveTab('clinics')}
                    >
                        <Building2 size={18} />
                        CliniCs アカウント
                        {activeTab === 'clinics' && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full"></span>
                        )}
                    </button>
                    <button
                        className={`px-6 py-4 font-medium text-sm flex items-center gap-2 transition-all relative ${activeTab === 'users'
                                ? 'text-primary-600'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                        onClick={() => setActiveTab('users')}
                    >
                        <User size={18} />
                        User アカウント
                        {activeTab === 'users' && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-t-full"></span>
                        )}
                    </button>
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-light bg-slate-50/30 flex justify-between items-center">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={16} />
                        <input
                            type="text"
                            placeholder="IDまたは名前で検索..."
                            className="input pl-10 h-10 bg-white"
                        />
                    </div>
                    <button className="btn btn-secondary flex items-center gap-2">
                        <Filter size={16} />
                        <span>フィルター</span>
                    </button>
                </div>

                {/* Table Content */}
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center text-text-muted">Loading...</div>
                ) : (
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>名前</th>
                                    {activeTab === 'clinics' ? (
                                        <>
                                            <th>親アカウント</th>
                                            <th>オプション</th>
                                        </>
                                    ) : (
                                        <>
                                            <th>ログインID</th>
                                            <th>所属クリニック</th>
                                            <th>権限</th>
                                        </>
                                    )}
                                    <th>ステータス</th>
                                    <th className="w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeTab === 'clinics' ? (
                                    clinics.map((clinic) => (
                                        <tr
                                            key={clinic.id}
                                            className="cursor-pointer hover:bg-slate-50 transition-colors border-b border-light last:border-0"
                                            onClick={() => navigate(`/accounts/${clinic.id}`)}
                                        >
                                            <td className="font-mono text-xs text-text-secondary">{clinic.id}</td>
                                            <td className="font-medium text-text-main">{clinic.name}</td>
                                            <td className="text-text-secondary">{clinic.parentId || '-'}</td>
                                            <td>
                                                <div className="flex gap-1 flex-wrap">
                                                    {clinic.options.map(opt => (
                                                        <span key={opt} className="badge badge-info border border-blue-100">{opt}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${clinic.active ? 'badge-success' : 'badge-neutral'}`}>
                                                    {clinic.active ? '有効' : '無効'}
                                                </span>
                                            </td>
                                            <td className="text-right">
                                                <button
                                                    className="p-2 hover:bg-slate-100 rounded text-text-muted transition-colors"
                                                    onClick={(e) => { e.stopPropagation(); }}
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="cursor-pointer hover:bg-slate-50 transition-colors border-b border-light last:border-0"
                                            onClick={() => navigate(`/accounts/${user.id}`)}
                                        >
                                            <td className="font-mono text-xs text-text-secondary">{user.id}</td>
                                            <td className="font-medium text-text-main">{user.name}</td>
                                            <td className="font-mono text-sm text-text-secondary">{user.loginId}</td>
                                            <td className="text-text-secondary">{user.clinicId}</td>
                                            <td>
                                                <span className="badge badge-neutral uppercase tracking-wider text-xs">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${user.active ? 'badge-success' : 'badge-neutral'}`}>
                                                    {user.active ? '有効' : '無効'}
                                                </span>
                                            </td>
                                            <td className="text-right">
                                                <button
                                                    className="p-2 hover:bg-slate-100 rounded text-text-muted transition-colors"
                                                    onClick={(e) => { e.stopPropagation(); }}
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Accounts;
