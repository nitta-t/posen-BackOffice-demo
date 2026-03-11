import React from 'react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Users, Camera, DollarSign, Plus, ArrowUpRight, ArrowDownRight, Activity, Calendar } from 'lucide-react';

const Dashboard = () => {
    // Mock Data
    const accountTrends = [
        { month: '4月', new: 12, churn: 1, total: 100 },
        { month: '5月', new: 18, churn: 2, total: 116 },
        { month: '6月', new: 25, churn: 1, total: 140 },
        { month: '7月', new: 22, churn: 3, total: 159 },
        { month: '8月', new: 30, churn: 2, total: 187 },
        { month: '9月', new: 35, churn: 2, total: 220 },
    ];

    const salesData = [
        { month: '4月', amount: 120 },
        { month: '5月', amount: 150 },
        { month: '6月', amount: 200 },
        { month: '7月', amount: 180 },
        { month: '8月', amount: 250 },
        { month: '9月', amount: 320 },
    ];

    const distributionData = [
        { name: '美容クリニック', value: 45, color: '#3b82f6' }, // Blue 500
        { name: '整体・整骨', value: 30, color: '#6366f1' }, // Indigo 500
        { name: 'フィットネス', value: 15, color: '#8b5cf6' }, // Violet 500
        { name: 'その他', value: 10, color: '#94a3b8' }, // Slate 400
    ];

    // Tiny sparkline data for cards
    const sparkData1 = [{ v: 10 }, { v: 15 }, { v: 13 }, { v: 20 }, { v: 25 }, { v: 22 }, { v: 30 }];
    const sparkData2 = [{ v: 20 }, { v: 22 }, { v: 25 }, { v: 28 }, { v: 30 }, { v: 35 }, { v: 40 }];
    const sparkData3 = [{ v: 30 }, { v: 25 }, { v: 35 }, { v: 40 }, { v: 35 }, { v: 45 }, { v: 50 }];
    const sparkData4 = [{ v: 100 }, { v: 120 }, { v: 110 }, { v: 140 }, { v: 130 }, { v: 160 }, { v: 180 }];

    const stats = [
        { label: '法人契約数', value: '128', sub: '+12 今月', icon: <Users size={20} className="text-white" />, color: 'bg-blue-500', trend: 'up', data: sparkData1 },
        { label: '総アカウント', value: '1,024', sub: '+85 今月', icon: <TrendingUp size={20} className="text-white" />, color: 'bg-indigo-500', trend: 'up', data: sparkData2 },
        { label: '月間撮影数', value: '45.2k', sub: '+12.5%', icon: <Camera size={20} className="text-white" />, color: 'bg-violet-500', trend: 'up', data: sparkData3 },
        { label: '月間売上 (予)', value: '¥3.2M', sub: '+8.2%', icon: <DollarSign size={20} className="text-white" />, color: 'bg-emerald-500', trend: 'up', data: sparkData4 },
    ];

    return (
        <div className="fade-in space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold mb-1 text-main">ダッシュボード</h1>
                    <p className="text-muted text-sm flex items-center gap-1">
                        <Calendar size={14} /> 2024年9月30日 現在
                    </p>
                </div>
                <button className="btn btn-primary shadow-lg shadow-primary-500/20">
                    <Plus size={18} />
                    <span>レポート作成</span>
                </button>
            </div>

            {/* Modern KPI Cards with Sparklines */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="card relative overflow-hidden group hover:shadow-lg transition-shadow border-0 shadow-md">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-muted text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-bold text-main">{stat.value}</h3>
                                    <span className={`text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'} flex items-center`}>
                                        {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {stat.sub}
                                    </span>
                                </div>
                            </div>
                            <div className={`p-2 rounded-lg shadow-sm ${stat.color} shadow-${stat.color.replace('bg-', '')}/30`}>
                                {stat.icon}
                            </div>
                        </div>

                        {/* Sparkline Background */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stat.data}>
                                    <Area type="monotone" dataKey="v" stroke="currentColor" fill="currentColor" className={stat.color.replace('bg-', 'text-')} strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Growth Chart */}
                <div className="card lg:col-span-2 border-0 shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <TrendingUp size={20} className="text-primary-500" />
                            アカウント推移
                            <span className="text-xs font-normal text-muted ml-2 bg-slate-100 px-2 py-1 rounded-full">過去6ヶ月</span>
                        </h2>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={accountTrends} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                                />
                                <Area type="monotone" dataKey="total" name="総アカウント" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
                                <Line type="monotone" dataKey="new" name="新規導入" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Industry Distribution */}
                <div className="card border-0 shadow-md flex flex-col">
                    <h2 className="text-lg font-bold mb-6">業態別シェア</h2>
                    <div className="flex-1 min-h-[200px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    cornerRadius={4}
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-main">45%</span>
                            <span className="text-xs text-muted">美容クリニック</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        {distributionData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm p-2 rounded bg-slate-50">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-secondary text-xs truncate">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales */}
                <div className="card border-0 shadow-md">
                    <h2 className="text-lg font-bold mb-6">月次売上推移</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData} barSize={20}>
                                <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={5} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="amount" name="売上" fill="#3b82f6" radius={[4, 4, 4, 4]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="card border-0 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">最新のアクティビティ</h2>
                        <button className="text-sm text-primary-600 font-medium hover:underline">すべて見る</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 z-10 relative">
                                        <Activity size={16} />
                                    </div>
                                    {i !== 2 && <div className="absolute top-8 left-1/2 w-px h-full bg-slate-200 -translate-x-1/2"></div>}
                                </div>
                                <div className="flex-1 pb-4 border-b border-light last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm font-bold text-main">青山美容クリニック {String.fromCharCode(65 + i)}院</p>
                                        <span className="text-xs text-muted">2時間前</span>
                                    </div>
                                    <p className="text-xs text-secondary mt-1 line-clamp-2">
                                        新規アカウント登録が完了しました。初期設定プロセス（端末認証、スタッフ登録）を開始します。
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
