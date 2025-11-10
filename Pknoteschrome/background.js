// Create context menu for right-clicking the extension icon
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'create-note',
    title: 'Create New Sticky Note',
    contexts: ['action']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'create-note') {
    chrome.tabs.sendMessage(tab.id, { action: 'createNote' });
  }
});

// Also handle left-click on the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'createNote' });
});

// Listen for messages from options page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'syncNotesToServer') {
    // Forward the sync request to the content script on the active tab
    // This will be handled by the content script which has access to the notes
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'syncNotesWithServer' }, (response) => {
          if (chrome.runtime.lastError) {
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
          } else {
            sendResponse(response);
          }
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true; // Keeps message channel open for async response
  }
});