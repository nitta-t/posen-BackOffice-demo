// Mock Data Service
// Currently utilizing static data, but designed to be replaceable with API calls

export const clinicsData = [
    { id: 'CL001', name: '青山美容クリニック 本院', parentId: null, options: ['基本機能', '分析'], active: true },
    { id: 'CL002', name: '青山美容クリニック 渋谷院', parentId: 'CL001', options: ['基本機能'], active: true },
    { id: 'CL003', name: '鈴木整骨院', parentId: null, options: ['基本機能', '予約'], active: true },
    { id: 'CL004', name: 'エステティックサロン Rose', parentId: null, options: ['基本機能'], active: false },
    { id: 'CL005', name: 'メディカルフィットネス Pro', parentId: null, options: ['基本機能', '分析', '予約'], active: true },
];

export const userData = [
    { id: 'U001', loginId: 'admin_aoyama', name: '山田 太郎', clinicId: 'CL001', role: 'admin', active: true, validUntil: '2025-12-31' },
    { id: 'U002', loginId: 'staff_shibuya', name: '鈴木 花子', clinicId: 'CL002', role: 'staff', active: true, validUntil: '2025-12-31' },
    { id: 'U003', loginId: 'admin_suzuki', name: '鈴木 一郎', clinicId: 'CL003', role: 'admin', active: true, validUntil: '2026-03-31' },
    { id: 'U004', loginId: 'demo_user', name: 'デモユーザー', clinicId: 'CL005', role: 'demo', active: true, validUntil: '2024-06-30' },
    { id: 'U005', loginId: 'staff_rose', name: '佐藤 次郎', clinicId: 'CL004', role: 'staff', active: false, validUntil: '2024-12-31' },
];

// Customers Data (More detailed than clinics)
export const customersData = [
    {
        id: 'CUST001',
        name: '医療法人社団 青山会',
        status: 'active', // active, considering, churned, partner
        plan: 'プレミアム',
        location: '東京都港区',
        phone: '03-1234-5678',
        staff: '田中 健太',
        contractDate: '2023-04-01',
        renewalDate: '2024-03-31',
        paymentMethod: '請求書払い',
        lineIntegrated: true,
        memo: '#大手 #紹介'
    },
    {
        id: 'CUST002',
        name: '鈴木整骨院グループ',
        status: 'active',
        plan: 'スタンダード',
        location: '神奈川県横浜市',
        phone: '045-123-4567',
        staff: '佐藤 優子',
        contractDate: '2023-06-15',
        renewalDate: '2024-06-14',
        paymentMethod: 'クレジットカード',
        lineIntegrated: false,
        memo: '#キャンペーン'
    },
    {
        id: 'CUST003',
        name: '株式会社Fitness Tokyo',
        status: 'considering',
        plan: '-',
        location: '東京都渋谷区',
        phone: '03-9876-5432',
        staff: '鈴木 一郎',
        contractDate: '-',
        renewalDate: '-',
        paymentMethod: '-',
        lineIntegrated: false,
        memo: '#見込み高'
    },
    {
        id: 'CUST004',
        name: 'エステティックサロン Rose',
        status: 'churned',
        plan: 'ライト',
        location: '東京都新宿区',
        phone: '03-5555-4444',
        staff: '田中 健太',
        contractDate: '2022-01-01',
        renewalDate: '-',
        churnDate: '2023-12-31',
        churnReason: '経営難',
        paymentMethod: '口座振替',
        lineIntegrated: true,
        memo: ''
    },
];

export const getClinics = () => {
    return Promise.resolve(clinicsData);
};

export const getUsers = () => {
    return Promise.resolve(userData);
};

export const getCustomers = () => {
    return Promise.resolve(customersData);
};
