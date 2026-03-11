lucide.createIcons();
initTabs();

function toggleEditMode() {
    const isEditing = document.body.classList.toggle('is-editing');

    // Toggle Input disabled state
    const inputs = document.querySelectorAll('.form-control, input[type="checkbox"]');
    inputs.forEach(input => {
        // Determine if it should be enabled based on logic? 
        // Simple toggle for now.
        input.disabled = !isEditing;
    });

    // Toggle Header Buttons
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const editModeBtn = document.getElementById('edit-mode-btn');

    if (isEditing) {
        if (saveBtn) saveBtn.classList.remove('hidden');
        if (cancelBtn) cancelBtn.classList.remove('hidden');
        if (editModeBtn) editModeBtn.classList.add('hidden');
    } else {
        if (saveBtn) saveBtn.classList.add('hidden');
        if (cancelBtn) cancelBtn.classList.add('hidden');
        if (editModeBtn) editModeBtn.classList.remove('hidden');
    }
}

async function submitForm() {
    const saveBtn = document.getElementById('save-btn');
    setButtonLoading(saveBtn, true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setButtonLoading(saveBtn, false);
    showToast('変更を保存しました', 'success');
    toggleEditMode();
}

function handleArchive() {
    showConfirmModal({
        title: 'アカウントの無効化',
        message: 'このアカウントを無効にしますか？<br>無効化されたアカウントはログインできなくなります。',
        confirmText: '無効にする',
        confirmColor: 'danger',
        onConfirm: async () => {
            await new Promise(r => setTimeout(r, 800));
            showToast('アカウントを無効にしました', 'success');
        }
    });
}
