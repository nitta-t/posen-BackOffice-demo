// Table Sorting and Bulk Selection Utilities

document.addEventListener('DOMContentLoaded', () => {
    initTables();
});

function initTables() {
    // Initialize standard tables with class 'data-table'
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        initSort(table);
        initBulkSelect(table);
    });
}

// Sorting Logic
function initSort(table) {
    const headers = table.querySelectorAll('th[data-sort]');
    headers.forEach(th => {
        th.style.cursor = 'pointer';
        th.style.userSelect = 'none';

        // Add icon placeholder
        if (!th.querySelector('.sort-icon')) {
            const icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.style.marginLeft = '4px';
            icon.style.color = '#cbd5e1';
            icon.innerHTML = '↕'; // Simple placeholder or use Lucide if available
            th.appendChild(icon);
        }

        th.addEventListener('click', () => {
            const type = th.dataset.sort; // string, number, date
            const index = Array.from(th.parentNode.children).indexOf(th);
            const isAsc = th.classList.contains('sort-asc');

            // Reset all headers
            headers.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
                const i = h.querySelector('.sort-icon');
                if (i) i.innerHTML = '↕';
            });

            // Toggle current
            th.classList.toggle('sort-asc', !isAsc);
            th.classList.toggle('sort-desc', isAsc);
            th.querySelector('.sort-icon').innerHTML = isAsc ? '↓' : '↑';

            sortTableRows(table, index, type, !isAsc);
        });
    });
}

function sortTableRows(table, colIndex, type, asc) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const aVal = a.children[colIndex].textContent.trim();
        const bVal = b.children[colIndex].textContent.trim();

        if (type === 'number') {
            return asc ? (parseFloat(aVal) - parseFloat(bVal)) : (parseFloat(bVal) - parseFloat(aVal));
        } else {
            return asc ? aVal.localeCompare(bVal, 'ja') : bVal.localeCompare(aVal, 'ja');
        }
    });

    // Re-append rows
    rows.forEach(row => tbody.appendChild(row));
}

// Bulk Selection Logic
function initBulkSelect(table) {
    const masterCheckbox = table.querySelector('thead input[type="checkbox"]');
    if (!masterCheckbox) return;

    const rowCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    const bulkActionDiv = document.getElementById('bulk-actions'); // Expecting this ID

    // Master toggle
    masterCheckbox.addEventListener('change', (e) => {
        const checked = e.target.checked;
        rowCheckboxes.forEach(cb => {
            cb.checked = checked;
            toggleRowSelection(cb.closest('tr'), checked);
        });
        updateBulkActionState(rowCheckboxes, bulkActionDiv);
    });

    // Row toggles
    rowCheckboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            toggleRowSelection(cb.closest('tr'), e.target.checked);

            // Update master checkbox state
            const allChecked = Array.from(rowCheckboxes).every(c => c.checked);
            const someChecked = Array.from(rowCheckboxes).some(c => c.checked);
            masterCheckbox.checked = allChecked;
            masterCheckbox.indeterminate = someChecked && !allChecked;

            updateBulkActionState(rowCheckboxes, bulkActionDiv);
        });

        // Stop click propagation on checkbox to prevent row click nav
        cb.addEventListener('click', (e) => e.stopPropagation());
    });
}

function toggleRowSelection(row, isSelected) {
    if (isSelected) {
        row.classList.add('bg-blue-50');
    } else {
        row.classList.remove('bg-blue-50');
    }
}

function updateBulkActionState(checkboxes, actionDiv) {
    if (!actionDiv) return;

    const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;
    if (checkedCount > 0) {
        actionDiv.style.display = 'flex';
        actionDiv.querySelector('.count-display').textContent = `${checkedCount} 件選択中`;
    } else {
        actionDiv.style.display = 'none';
    }
}
