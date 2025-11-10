// Simple options page functionality

document.addEventListener('DOMContentLoaded', () => {
    // Load saved options
    chrome.storage.sync.get(['analytics'], (result) => {
        const analyticsCheckbox = document.getElementById('analytics');
        if (analyticsCheckbox) {
            // Assuming inverted logic - checked means analytics enabled
            analyticsCheckbox.checked = result.analytics !== false;
        }
    });
    
    // Save options when save button is clicked
    const saveButton = document.getElementById('save');
    if (saveButton) {
        saveButton.addEventListener('click', saveOptions);
    }
});

function saveOptions() {
    const analyticsCheckbox = document.getElementById('analytics');
    const analyticsEnabled = analyticsCheckbox ? analyticsCheckbox.checked : true;
    
    chrome.storage.sync.set({ analytics: analyticsEnabled }, () => {
        const status = document.getElementById('status');
        if (status) {
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    });
}