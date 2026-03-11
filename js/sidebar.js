
(function () {
    const sidebarHTML = `
<aside class="sidebar">
    <div class="sidebar-header">
        <a href="index.html" class="brand">
            <i data-lucide="layout-dashboard"></i> POSEN ADMIN
        </a>
    </div>
    <ul class="nav-links">
        <!-- 1. ダッシュボード -->
        <li class="nav-item">
            <a href="index.html" class="nav-link" data-match="index.html">
                <i data-lucide="layout-dashboard"></i> ダッシュボード
            </a>
        </li>
        <!-- 2. 顧客管理 -->
        <li class="nav-item">
            <a href="customers.html" class="nav-link" data-match="customers.html|customer-detail.html">
                <i data-lucide="users"></i> 顧客管理
            </a>
        </li>
        <!-- 3. アカウント管理 -->
        <li class="nav-item">
            <a href="accounts.html" class="nav-link" data-match="accounts.html|account-detail.html|account-user-detail.html">
                <i data-lucide="building-2"></i> アカウント管理
            </a>
        </li>

        <li style="border-top: 1px solid rgba(255,255,255,0.08); margin: 8px 16px;"></li>

        <!-- 4. アクティビティログ -->
        <li class="nav-item">
            <a href="activity-logs.html" class="nav-link" data-match="activity-logs.html">
                <i data-lucide="activity"></i> アクティビティログ
            </a>
        </li>
        <!-- 5. データベース -->
        <li class="nav-item">
            <a href="database.html" class="nav-link" data-match="database.html">
                <i data-lucide="database"></i> データベース
            </a>
        </li>
        <!-- 6. 売上管理 -->
        <li class="nav-item">
            <a href="billing.html" class="nav-link" data-match="billing.html">
                <i data-lucide="receipt"></i> 売上管理
            </a>
        </li>
        <!-- 7. 詳細分析 -->
        <li class="nav-item">
            <a href="analytics.html" class="nav-link" data-match="analytics.html">
                <i data-lucide="bar-chart-2"></i> 詳細分析
            </a>
        </li>

        <!-- 8. アクセス管理 -->
        <li class="nav-item" style="margin-top:auto; border-top:1px solid rgba(255,255,255,0.08); padding-top:8px;">
            <a href="admin-accounts.html" class="nav-link" data-match="admin-accounts.html">
                <i data-lucide="shield-check"></i> アクセス管理
            </a>
        </li>
        <!-- 9. 設定 -->
        <li class="nav-item">
            <a href="settings.html" class="nav-link" data-match="settings.html">
                <i data-lucide="settings"></i> 設定
            </a>
        </li>
    </ul>
</aside>`;

    const container = document.getElementById('sidebar-container');
    if (!container) return;
    container.innerHTML = sidebarHTML;

    // 現在のページ名を取得してアクティブリンクを設定
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    container.querySelectorAll('[data-match]').forEach(link => {
        const matches = link.getAttribute('data-match').split('|');
        if (matches.includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // Lucideアイコンを再描画
    if (window.lucide) {
        lucide.createIcons();
    }
})();
