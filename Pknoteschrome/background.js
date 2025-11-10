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