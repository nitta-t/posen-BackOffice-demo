/**
 * Handles table searching and filtering.
 */

// Simple text search
function filterTable(tableId, query) {
    const table = document.querySelector(tableId);
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    const lowerQuery = query.toLowerCase();

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        // Simple toggle
        if (text.includes(lowerQuery)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Filter by specific status (looks into the Status column)
// We assume Status is in a specific column or we search the whole row for the status text.
// Searching whole row is easier and usually sufficient for simple filtering.
function filterByStatus(tableId, status) {
    const table = document.querySelector(tableId);
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
        if (status === 'all') {
            row.style.display = '';
            return;
        }

        // Check data-status attribute (Preferred)
        const rowStatus = row.dataset.status;
        if (rowStatus) {
            if (rowStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
            return;
        }

        // Fallback to text content search (Legacy)
        // Map status codes to Japanese text if needed, but data-status is better.
        let textToFind = status;
        if (status === 'active') textToFind = '有効';
        if (status === 'inactive') textToFind = '無効'; // Also matches 停止 etc if we change logic? 
        // Logic for text fallback:
        // For 'inactive', we might want to show '停止' or '支払遅延' too.
        // But let's rely on data-status for the main implementation now.

        const text = row.textContent.trim();
        if (text.includes(textToFind)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Search Input Logic
    const searchInput = document.getElementById('account-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            // Filter BOTH tables to ensure consistency when switching tabs
            filterTable('#tab-clinics table', query);
            filterTable('#tab-users table', query);
        });
    }

    // Filter Chips Logic
    const filterButtons = document.querySelectorAll('.filter-chip');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI toggle
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const status = btn.dataset.status;

            // Filter BOTH tables
            // Pass the raw 'status' code (all, active, inactive) because filterByStatus
            // checks data-status attribute first.
            filterByStatus('#tab-clinics table', status);
            filterByStatus('#tab-users table', status);
        });
    });
});

function isClinicsTabActive() {
    const clinicsTab = document.getElementById('tab-clinics');
    return clinicsTab && clinicsTab.style.display !== 'none';
}
