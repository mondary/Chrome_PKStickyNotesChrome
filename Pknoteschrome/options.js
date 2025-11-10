// Save settings
document.getElementById('save').addEventListener('click', async () => {
  const showFloatingButton = document.getElementById('showFloatingButton').checked;
  const syncOnline = document.getElementById('syncOnline').checked;
  
  await chrome.storage.sync.set({
    showFloatingButton: showFloatingButton,
    syncOnline: syncOnline
  });
  
  // Show status message
  const status = document.getElementById('status');
  status.textContent = 'Settings saved!';
  status.style.display = 'block';
  
  setTimeout(() => {
    status.style.display = 'none';
  }, 2000);
});

// Login functionality
document.getElementById('login').addEventListener('click', () => {
  chrome.tabs.create({url: 'https://mondary.design/pk/pknotes/index.html'});
});

// Test note functionality
async function getSessionId() {
  try {
    const cookie = await chrome.cookies.get({url: 'https://mondary.design', name: 'PHPSESSID'});
    return cookie ? cookie.value : null;
  } catch {
    return null;
  }
}

document.getElementById('test-note').addEventListener('click', async () => {
  const sessionId = await getSessionId();
  if (!sessionId) {
    alert('No session found. Please login first.');
    return;
  }
  try {
    const response = await fetch('https://mondary.design/pk/pknotes/backend/api.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        action: 'import_notes',
        notes: [{
          id: 'test_' + Date.now(),
          text: '<!-- x:100,y:100,colorIndex:0,width:210,height:110,pinned:false,url:http://test.com -->Test note from extension',
          timestamp: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          archived: false
        }],
        tagDescriptions: [],
        favoriteTags: [],
        settings: {sortOldestFirst: false, archiveBelow: true, showArchived: false, language: null}
      })
    });
    const result = await response.json();
    alert('Test result: ' + JSON.stringify(result));
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

document.getElementById('get-notes').addEventListener('click', async () => {
  const sessionId = await getSessionId();
  if (!sessionId) {
    alert('No session found. Please login first.');
    return;
  }
  try {
    const response = await fetch('https://mondary.design/pk/pknotes/backend/api.php', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });
    const result = await response.json();
    alert('Get result: ' + JSON.stringify(result));
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

// Manual sync functionality
document.getElementById('manual-sync').addEventListener('click', async () => {
  const syncStatus = document.getElementById('sync-status');
  syncStatus.textContent = 'Syncing...';
  syncStatus.style.display = 'block';
  syncStatus.style.backgroundColor = '#fff3cd';
  syncStatus.style.color = '#856404';

  try {
    const sessionId = await getSessionId();
    if (!sessionId) {
      throw new Error('No session found. Please login first.');
    }

    // Get local notes
    const result = await chrome.storage.local.get(['all_notes']);
    const allNotes = result.all_notes || [];

    // Send to server
    const saveResponse = await fetch('https://mondary.design/pk/pknotes/backend/api.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        action: 'import_notes',
        notes: allNotes,
        tagDescriptions: [],
        favoriteTags: [],
        settings: {sortOldestFirst: false, archiveBelow: true, showArchived: false, language: null}
      })
    });
    const saveResult = await saveResponse.json();
    if (saveResult.status !== 'success') {
      throw new Error('Save failed: ' + saveResult.message);
    }

    // Load from server
    const loadResponse = await fetch('https://mondary.design/pk/pknotes/backend/api.php', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });
    const loadResult = await loadResponse.json();
    if (loadResult.messages) {
      const notes = loadResult.messages.map(msg => ({
        id: msg.id,
        text: msg.text,
        timestamp: msg.timestamp,
        created_at: msg.created_at,
        updated_at: msg.updated_at,
        archived: msg.archived
      }));
      await chrome.storage.local.set({ all_notes: notes });
    }

    syncStatus.textContent = 'Sync completed successfully!';
    syncStatus.style.backgroundColor = '#d4edda';
    syncStatus.style.color = '#155724';
  } catch (error) {
    syncStatus.textContent = 'Sync failed: ' + error.message;
    syncStatus.style.backgroundColor = '#f8d7da';
    syncStatus.style.color = '#721c24';
  }

  // Hide status after 5 seconds
  setTimeout(() => {
    syncStatus.style.display = 'none';
  }, 5000);
});

// Load saved settings
document.addEventListener('DOMContentLoaded', async () => {
  const result = await chrome.storage.sync.get(['showFloatingButton', 'syncOnline']);
  
  document.getElementById('showFloatingButton').checked = result.showFloatingButton !== false; // Default to true
  document.getElementById('syncOnline').checked = result.syncOnline === true; // Default to false
});