import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, User, Mail, Phone, Calendar, Shield, Activity } from 'lucide-react';
import { getClinics, getUsers } from '../services/mockData';

const AccountDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccount = async () => {
            setLoading(true);
            // Mock fetch logic - checking both clinics and users
            const [clinics, users] = await Promise.all([getClinics(), getUsers()]);
            const found = clinics.find(c => c.id === id) || users.find(u => u.id === id);
            setAccount(found);
            setLoading(false);
        };
        fetchAccount();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-muted">Loading...</div>;
    if (!account) return <div className="p-8 text-center text-muted">Account not found</div>;

    const isClinic = account.id.startsWith('CL');

    return (
        <div className="fade-in max-w-4xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-muted hover:text-primary-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} className="mr-1" />
                戻る
            </button>

            <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-white shadow-sm border border-light ${isClinic ? 'text-primary-600' : 'text-secondary-500'}`}>
                    {isClinic ? <Building2 size={32} /> : <User size={32} />}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-main">{account.name}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="font-mono text-sm text-muted bg-slate-100 px-2 py-0.5 rounded">{account.id}</span>
                        <span className={`badge ${account.active ? 'badge-success' : 'badge-neutral'}`}>
                            {account.active ? '有効' : '無効'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info Card */}
                <div className="card">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Activity size={20} className="text-primary-500" />
                        基本情報
                    </h2>
                    <div className="space-y-4">
                        {isClinic ? (
                            <>
                                <div className="flex justify-between border-b border-light pb-2">
                                    <span className="text-muted">親アカウントID</span>
                                    <span className="font-medium">{account.parentId || '-'}</span>
                                </div>
                                <div className="flex justify-between border-b border-light pb-2">
                                    <span className="text-muted">契約プラン</span>
                                    <span className="font-medium">スタンダード</span>
                                </div>
                                <div className="flex flex-col gap-2 pt-2">
                                    <span className="text-muted">オプション</span>
                                    <div className="flex flex-wrap gap-2">
                                        {account.options?.map(opt => (
                                            <span key={opt} className="badge badge-info">{opt}</span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between border-b border-light pb-2">
                                    <span className="text-muted">ログインID</span>
                                    <span className="font-mono font-medium">{account.loginId}</span>
                                </div>
                                <div className="flex justify-between border-b border-light pb-2">
                                    <span className="text-muted">所属クリニック</span>
                                    <span className="font-medium text-primary-600">{account.clinicId}</span>
                                </div>
                                <div className="flex justify-between border-b border-light pb-2">
                                    <span className="text-muted">権限</span>
                                    <span className="badge badge-neutral lowercase">{account.role}</span>
                                </div>
                                <div className="flex justify-between border-b border-light pb-2">
                                    <span className="text-muted">有効期限</span>
                                    <span className="font-medium">{account.validUntil || '-'}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Contact / System Info Card */}
                <div className="card">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-primary-500" />
                        システム・連絡先
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail size={16} className="text-muted" />
                            <span>{isClinic ? 'contact@clinic.example.com' : 'staff@example.com'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone size={16} className="text-muted" />
                            <span>03-1234-5678</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar size={16} className="text-muted" />
                            <span>登録日: 2023-04-01</span>
                        </div>

                        <div className="pt-4 mt-4 border-t border-light">
                            <h3 className="text-sm font-medium mb-2">メモ</h3>
                            <p className="text-sm text-muted bg-slate-50 p-3 rounded">
                                特記事項はありません。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetail;
