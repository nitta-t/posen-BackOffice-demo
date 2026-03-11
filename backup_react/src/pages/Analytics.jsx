import React, { useState } from 'react';
import {
    BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { BarChart3, TrendingUp, Users, Smartphone, CreditCard } from 'lucide-react';

// Mock Data (Simplified for Master-Detail)
const usageData = [
    { day: 'Mon', active: 150 },
    { day: 'Tue', active: 180 },
    { day: 'Wed', active: 160 },
    { day: 'Thu', active: 190 },
    { day: 'Fri', active: 220 },
    { day: 'Sat', active: 140 },
    { day: 'Sun', active: 130 },
];

const deviceData = [
    { name: 'iOS', value: 65, color: '#3b82f6' },
    { name: 'Android', value: 35, color: '#64748b' },
];

const Analytics = () => {
    const [activeView, setActiveView] = useState('overview');

    const menuItems = [
        { id: 'overview', label: 'サマリー', icon: <BarChart3 size={18} /> },
        { id: 'trends', label: 'アカウント推移', icon: <TrendingUp size={18} /> },
        { id: 'usage', label: '利用状況', icon: <Users size={18} /> },
        { id: 'devices', label: 'デバイス比率', icon: <Smartphone size={18} /> },
        { id: 'sales', label: '売上分析', icon: <CreditCard size={18} /> },
    ];

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return (
                    <div className="space-y-6 fade-in p-6">
                        <h2 className="text-xl font-bold mb-4">分析サマリー</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="card">
                                <h3 className="text-muted text-sm font-bold uppercase mb-2">総DAU (日次)</h3>
                                <div className="text-3xl font-bold text-main">152 <span className="text-sm font-normal text-muted">/ avg</span></div>
                                <div className="h-32 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={usageData}>
                                            <Area type="monotone" dataKey="active" stroke="#3b82f6" fill="#eff6ff" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="card">
                                <h3 className="text-muted text-sm font-bold uppercase mb-2">iOS / Android 比率</h3>
                                <div className="flex gap-4 items-center">
                                    <div className="flex-1 h-32">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={deviceData} innerRadius={40} outerRadius={55} paddingAngle={5} dataKey="value">
                                                    {deviceData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-primary-500"></div> iOS: 65%</div>
                                        <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-slate-500"></div> Android: 35%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'usage':
                return (
                    <div className="fade-in p-6">
                        <h2 className="text-xl font-bold mb-4">利用状況詳細</h2>
                        <div className="card h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={usageData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="fade-in p-12 text-center text-muted">
                        <h2 className="text-xl font-bold mb-2">準備中</h2>
                        <p>このセクションの詳細分析機能は現在開発中です。</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-[calc(100vh-2rem)] gap-6 overflow-hidden">
            {/* Left Sidebar Menu - Refined List Style */}
            <div className="w-64 flex-shrink-0 card p-0 overflow-hidden flex flex-col border-r-0 h-full">
                <div className="p-6 pb-2">
                    <h2 className="font-bold text-lg text-main">分析メニュー</h2>
                </div>
                <div className="p-3 flex-1 overflow-y-auto space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeView === item.id
                                    ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <span className={activeView === item.id ? 'text-primary-600' : 'text-slate-400'}>
                                {item.icon}
                            </span>
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 rounded-xl border border-light">
                {renderContent()}
            </div>
        </div>
    );
};

export default Analytics;
