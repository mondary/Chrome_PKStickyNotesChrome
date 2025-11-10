// Simple background script for PKsticky

// Function to send message to active tab
function sendContentMessage(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.tabs.sendMessage(tab.id, message, function (response) {
                if (chrome.runtime.lastError) {
                    // Error is expected if the tab doesn't have our content script
                }
            });
        }
    });
}

// Create contexts and event listeners
function createContexts() {
    chrome.contextMenus.removeAll();
    chrome.action.onClicked.addListener(function (tab) {
        sendContentMessage("create-note");
    });
}

// Initialize
createContexts();