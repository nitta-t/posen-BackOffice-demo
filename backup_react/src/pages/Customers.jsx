import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal, Building2, MapPin, Phone, Calendar } from 'lucide-react';
import { getCustomers } from '../services/mockData';

const Customers = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getCustomers();
            setCustomers(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return <span className="badge badge-success">利用中</span>;
            case 'considering':
                return <span className="badge badge-info">検討中</span>;
            case 'churned':
                return <span className="badge badge-error">解約</span>;
            default:
                return <span className="badge badge-neutral">{status}</span>;
        }
    };

    const filteredCustomers = filterStatus === 'all'
        ? customers
        : customers.filter(c => c.status === filterStatus);

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">顧客管理</h1>
                    <p className="text-muted text-sm">契約顧客および見込み顧客のリスト</p>
                </div>
                <button className="btn btn-primary flex items-center gap-2">
                    <Plus size={16} />
                    <span>顧客登録</span>
                </button>
            </div>

            <div className="card min-h-[500px] flex flex-col p-0">
                {/* Filters - Modern Pill Style */}
                <div className="p-4 border-b border-light bg-slate-50/30 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={16} />
                        <input
                            type="text"
                            placeholder="顧客名、地域で検索..."
                            className="input pl-10 h-10 bg-white"
                        />
                    </div>

                    <div className="flex gap-2 bg-white p-1 rounded-full border border-slate-200">
                        {[
                            { id: 'all', label: 'すべて' },
                            { id: 'active', label: '利用中' },
                            { id: 'considering', label: '検討中' },
                            { id: 'churned', label: '解約' }
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setFilterStatus(filter.id)}
                                className={`px-4 py-1.5 text-sm rounded-full transition-all font-medium ${filterStatus === filter.id
                                        ? 'bg-primary-600 text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table Content */}
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center text-text-muted">Loading...</div>
                ) : (
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th>顧客ID</th>
                                    <th>顧客名 (施設名)</th>
                                    <th>ステータス</th>
                                    <th>プラン / 担当</th>
                                    <th>契約情報</th>
                                    <th>メモ</th>
                                    <th className="w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="cursor-pointer hover:bg-slate-50 transition-colors border-b border-light last:border-0"
                                        onClick={() => navigate(`/customers/${customer.id}`)}
                                    >
                                        <td className="font-mono text-xs text-text-secondary">{customer.id}</td>
                                        <td>
                                            <div className="font-medium text-text-main">{customer.name}</div>
                                            <div className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                                                <MapPin size={12} className="text-text-muted" /> {customer.location}
                                            </div>
                                        </td>
                                        <td>
                                            {getStatusBadge(customer.status)}
                                        </td>
                                        <td>
                                            <div className="text-sm text-text-main">{customer.plan}</div>
                                            <div className="text-xs text-text-secondary mt-0.5">担: {customer.staff}</div>
                                        </td>
                                        <td>
                                            {customer.active !== false && customer.contractDate !== '-' ? (
                                                <div className="text-xs text-text-secondary">
                                                    <div className="flex items-center gap-1 mb-0.5"><Calendar size={12} className="text-text-muted" /> 更新: {customer.renewalDate}</div>
                                                    <div className="text-text-muted">契約: {customer.contractDate}</div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-text-muted">-</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="text-xs text-primary-600 font-medium">{customer.memo}</div>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;
