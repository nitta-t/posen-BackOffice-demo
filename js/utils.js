// HTML エスケープ（XSS対策）
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Toast Notification
function showToast(message, type = 'success') {
    // Create toast container if not exists
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? '#10b981' : (type === 'error' ? '#ef4444' : '#3b82f6');
    const icon = type === 'success' ? 'check-circle' : (type === 'error' ? 'alert-circle' : 'info');

    toast.style.cssText = `
        background-color: white; 
        border-left: 4px solid ${bgColor};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 16px 20px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        font-size: 14px;
        color: #334155;
    `;

    toast.innerHTML = `
        <i data-lucide="${icon}" style="color: ${bgColor};" width="20"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });

    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Button Loading State
function setButtonLoading(btn, isLoading, loadingText = '処理中...') {
    if (isLoading) {
        btn.dataset.originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `
            <i data-lucide="loader-2" class="animate-spin" width="16"></i>
            ${loadingText}
        `;
        // Add minimal spin animation style if not exists
        if (!document.getElementById('spin-style')) {
            const style = document.createElement('style');
            style.id = 'spin-style';
            style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }';
            document.head.appendChild(style);
        }
    } else {
        btn.innerHTML = btn.dataset.originalText;
        btn.disabled = false;
    }
    lucide.createIcons();
}

// Modal System
function showConfirmModal({ title, message, confirmText = '実行する', confirmColor = 'primary', onConfirm }) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 50; opacity: 0; transition: opacity 0.2s;';

    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = 'background: white; border-radius: 12px; padding: 24px; width: 100%; max-width: 400px; transform: scale(0.95); transition: transform 0.2s; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);';

    const btnClass = confirmColor === 'danger' ? 'background-color: #ef4444; color: white;' : 'background-color: #2563eb; color: white;';

    modal.innerHTML = `
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #0f172a;">${title}</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 24px; line-height: 1.5;">${message}</p>
        <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button id="modal-cancel" class="btn btn-secondary">キャンセル</button>
            <button id="modal-confirm" class="btn" style="${btnClass} border: none;">${confirmText}</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    });

    const closeModal = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        setTimeout(() => overlay.remove(), 200);
    };

    overlay.querySelector('#modal-cancel').onclick = closeModal;
    overlay.querySelector('#modal-confirm').onclick = async () => {
        const btn = overlay.querySelector('#modal-confirm');
        setButtonLoading(btn, true);
        if (onConfirm) await onConfirm(); // Allow async confirm
        closeModal();
    };

    // Close on click outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}
