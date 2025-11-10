// Save settings
document.getElementById('save').addEventListener('click', async () => {
  const showFloatingButton = document.getElementById('showFloatingButton').checked;
  const savePosition = document.getElementById('savePosition').checked;
  
  await chrome.storage.sync.set({
    showFloatingButton: showFloatingButton,
    savePosition: savePosition
  });
  
  // Show status message
  const status = document.getElementById('status');
  status.textContent = 'Settings saved!';
  status.style.display = 'block';
  
  setTimeout(() => {
    status.style.display = 'none';
  }, 2000);
});

// Load saved settings
document.addEventListener('DOMContentLoaded', async () => {
  const result = await chrome.storage.sync.get(['showFloatingButton', 'savePosition']);
  
  document.getElementById('showFloatingButton').checked = result.showFloatingButton !== false; // Default to true
  document.getElementById('savePosition').checked = result.savePosition !== false; // Default to true
});