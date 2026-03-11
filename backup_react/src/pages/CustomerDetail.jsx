import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Calendar, FileText, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { getCustomers } from '../services/mockData';

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            setLoading(true);
            const data = await getCustomers();
            const found = data.find(c => c.id === id);
            setCustomer(found);
            setLoading(false);
        };
        fetchCustomer();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-muted">Loading...</div>;
    if (!customer) return <div className="p-8 text-center text-muted">Customer not found</div>;

    return (
        <div className="fade-in max-w-5xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-muted hover:text-primary-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} className="mr-1" />
                戻る
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="badge badge-neutral font-mono">{customer.id}</span>
                        {customer.status === 'active' && <span className="badge badge-success">利用中</span>}
                        {customer.status === 'considering' && <span className="badge badge-info">検討中</span>}
                        {customer.status === 'churned' && <span className="badge badge-error">解約</span>}
                    </div>
                    <h1 className="text-3xl font-bold text-main">{customer.name}</h1>
                    <div className="flex items-center gap-2 text-muted mt-1">
                        <MapPin size={16} />
                        <span>{customer.location}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="btn btn-secondary">編集</button>
                    <button className="btn btn-primary">契約更新</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="card lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-lg font-bold mb-4 border-b border-light pb-2">契約詳細</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <label className="text-xs text-muted uppercase tracking-wider block mb-1">契約プラン</label>
                                <div className="font-medium text-lg">{customer.plan || '-'}</div>
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase tracking-wider block mb-1">支払い方法</label>
                                <div className="font-medium">{customer.paymentMethod || '-'}</div>
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase tracking-wider block mb-1">契約開始日</label>
                                <div className="font-medium">{customer.contractDate || '-'}</div>
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase tracking-wider block mb-1">次回更新日</label>
                                <div className="font-medium text-primary-600">{customer.renewalDate || '-'}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-4 border-b border-light pb-2">LINE連携状況</h2>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-light">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${customer.lineIntegrated ? 'bg-[#06C755] text-white' : 'bg-slate-200 text-slate-400'}`}>
                                <MessageCircle size={24} fill="currentColor" />
                            </div>
                            <div>
                                <div className="font-bold text-main">{customer.lineIntegrated ? '連携済み' : '未連携'}</div>
                                <p className="text-sm text-muted">
                                    {customer.lineIntegrated
                                        ? '公式LINEアカウントとの連携が完了しています。'
                                        : 'まだLINE連携が行われていません。設定を完了させてください。'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="card">
                        <h2 className="text-lg font-bold mb-4 border-b border-light pb-2">担当者情報</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-muted uppercase tracking-wider block mb-1">弊社担当</label>
                                <div className="font-medium flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs">
                                        {customer.staff?.charAt(0)}
                                    </div>
                                    {customer.staff}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase tracking-wider block mb-1">先方担当者</label>
                                <div className="font-medium">山田 太郎 様</div>
                            </div>
                            <div>
                                <label className="text-xs text-muted uppercase tracking-wider block mb-1">連絡先</label>
                                <div className="flex items-center gap-2 font-mono text-sm">
                                    <Phone size={14} /> {customer.phone}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-yellow-50 border-yellow-100">
                        <h2 className="text-sm font-bold text-yellow-800 mb-2">タグ / メモ</h2>
                        <div className="text-sm text-yellow-900 leading-relaxed mb-3">
                            {customer.memo || 'メモはありません'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge bg-white text-yellow-800 border border-yellow-200">#重要</span>
                            <span className="badge bg-white text-yellow-800 border border-yellow-200">#要確認</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
