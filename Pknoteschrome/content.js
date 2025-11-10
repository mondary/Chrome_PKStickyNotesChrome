// Global key for all notes
const globalKey = 'all_notes';

// Simplified URL key (without query params, hash, and trailing slash)
const simplifiedUrl = (window.location.origin + window.location.pathname).replace(/\/$/, '');

// Sync management
let needsSync = false;

// Periodic sync every 30 seconds
setInterval(() => {
  if (needsSync) {
    syncNotesWithServer();
  }
}, 30000);

// Sync before page unload
window.addEventListener('beforeunload', () => {
  if (needsSync) {
    // Attempt sync, though async
    syncNotesWithServer();
  }
});

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function getSessionId() {
  try {
    const cookie = await chrome.cookies.get({url: 'https://mondary.design', name: 'PHPSESSID'});
    return cookie ? cookie.value : null;
  } catch {
    return null;
  }
}

function parseNote(note) {
  let text = note.text;
  let id = note.id;
  let x = 100, y = 100, colorIndex = 0, width = '210px', height = '110px', pinned = false, url = '';
  if (text.startsWith('<!--') && text.includes('-->')) {
    const end = text.indexOf('-->') + 3;
    const metaStr = text.substring(4, end - 3);
    const meta = Object.fromEntries(metaStr.split(',').map(s => s.split(':')));
    x = parseInt(meta.x) || 100;
    y = parseInt(meta.y) || 100;
    colorIndex = parseInt(meta.colorIndex) || 0;
    width = meta.width || '210px';
    height = meta.height || '110px';
    pinned = meta.pinned === 'true';
    url = (meta.url || '').replace(/\/$/, ''); // Normalize URL
    text = text.substring(end);
  }
  return { text, x, y, colorIndex, width, height, pinned, url, id };
}

// Load existing notes - prioritize local storage by default
const allNotesStr = localStorage.getItem(globalKey);
const allNotes = allNotesStr ? JSON.parse(allNotesStr) : [];

// Load all notes for this site from local storage first
allNotes.forEach(note => {
  const parsed = parseNote(note);
  if (parsed.url === simplifiedUrl) {
    createNote(parsed.x, parsed.y, parsed.text, parsed.colorIndex, parsed.width, parsed.height, parsed.pinned, parsed.id);
  }
});

// Load sync preference separately
chrome.storage.sync.get(['syncOnline']).then((result) => {
  const syncOnline = result.syncOnline || false;
  
  if (syncOnline) {
    // If sync is enabled, also load from server
    loadNotesFromServer();
  }
});

// Color styles
const colorList = [
  'linear-gradient(135deg, #ffeb3b 0%, #fdd835 100%)',
  '#ffb3ba',
  '#bae1ff',
  '#baffba',
  '#ff6b6b',
  '#ffa726',
  '#ce93d8',
  '#4dd0e1',
  '#81c784',
  '#a1887f',
  '#2196f3',
  '#4caf50',
  '#ffeb3b',
  '#3f51b5',
  '#009688',
  '#ffc107',
  '#ff5722',
  '#9e9e9e'
];

// Function to find optimal position for a new note ensuring URL visibility
function findOptimalPosition(noteWidth = 250, noteHeight = 180) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Reserve space at the bottom for URL display - approximately 50px
  const reservedBottomSpace = 50;
  
  // Get all existing notes to calculate occupied spaces
  const existingNotes = document.querySelectorAll('.sticky-note');
  const occupiedAreas = [];
  
  existingNotes.forEach(note => {
    const rect = note.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(note);
    
    // Calculate actual position including margins/borders
    const noteX = parseFloat(computedStyle.left) || rect.left;
    const noteY = parseFloat(computedStyle.top) || rect.top;
    
    occupiedAreas.push({
      x: noteX,
      y: noteY,
      width: rect.width,
      height: rect.height
    });
  });
  
  // Start search from top-left corner
  const margin = 20; // Space around notes
  let newY = margin;
  
  // Try to position the note while avoiding the bottom reserved area
  while (newY < viewportHeight - noteHeight - reservedBottomSpace) {
    // Try to place the note at this Y level
    let newX = margin;
    
    while (newX < viewportWidth - noteWidth) {
      // Check if this position overlaps with any existing note
      let overlap = false;
      for (const area of occupiedAreas) {
        // Check for collision: (x1 < x2+w2) && (x2 < x1+w1) && (y1 < y2+h2) && (y2 < y1+h1)
        if (newX < area.x + area.width + margin &&
            area.x < newX + noteWidth + margin &&
            newY < area.y + area.height + margin &&
            area.y < newY + noteHeight + margin) {
          overlap = true;
          newX = area.x + area.width + margin; // Skip past the overlapping note
          break;
        }
      }
      
      if (!overlap) {
        // Ensure the note doesn't extend into the reserved bottom area
        if (newY + noteHeight <= viewportHeight - reservedBottomSpace) {
          return { x: newX, y: newY };
        }
      }
      newX += 20; // Increment to avoid infinite loop
    }
    
    // If we couldn't find a position at this Y level, try the next one
    newY += 50; // Move down by a reasonable increment
  }
  
  // If we can't find a good position above the reserved area, find the best possible position
  // Start from the top again but allow positioning anywhere except the very bottom
  newY = margin;
  while (newY < viewportHeight - noteHeight - reservedBottomSpace) {
    let newX = margin;
    
    while (newX < viewportWidth - noteWidth) {
      let overlap = false;
      for (const area of occupiedAreas) {
        if (newX < area.x + area.width + margin &&
            area.x < newX + noteWidth + margin &&
            newY < area.y + area.height + margin &&
            area.y < newY + noteHeight + margin) {
          overlap = true;
          newX = area.x + area.width + margin;
          break;
        }
      }
      
      if (!overlap) {
        return { x: newX, y: newY };
      }
      newX += 20;
    }
    newY += 50;
  }
  
  // If all else fails, use the original method but ensure it's away from the bottom
  let x = margin;
  let y = margin;
  
  // Check if we have existing notes and try to place the new note near them
  if (existingNotes.length > 0) {
    // Find the rightmost note and place the new note below it
    let rightmostNote = null;
    let rightmostX = -1;
    
    existingNotes.forEach(note => {
      const rect = note.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(note);
      const noteX = parseFloat(computedStyle.left) || rect.left;
      const noteY = parseFloat(computedStyle.top) || rect.top;
      
      if (noteX > rightmostX) {
        rightmostX = noteX;
        rightmostNote = { x: noteX, y: noteY, width: rect.width, height: rect.height };
      }
    });
    
    if (rightmostNote) {
      x = rightmostNote.x + rightmostNote.width + margin;
      y = rightmostNote.y;
      
      // If this would go off-screen, wrap to next line
      if (x + noteWidth > viewportWidth) {
        x = margin;
        y = rightmostNote.y + rightmostNote.height + margin;
      }
      
      // Ensure we don't place it in the reserved area
      if (y + noteHeight > viewportHeight - reservedBottomSpace) {
        y = margin;
      }
    }
  }
  
  return { x: x, y: y };
}

// Create note function
function createNote(x, y, text = '', colorIndex = 0, width = '250px', height = '180px', pinned = false, id = null) {
  const note = document.createElement('div');
  note.className = 'sticky-note';
  note.style.left = x + 'px';
  note.style.top = y + 'px';
  note.style.background = colorList[colorIndex];
  note.style.width = width;
  note.style.height = height;
  note.style.position = pinned ? 'fixed' : 'absolute';
  note.currentColorIndex = colorIndex;
  
  // Create header element for dragging
  const header = document.createElement('div');
  header.className = 'sticky-note-header';
  note.appendChild(header);
  
  note.innerHTML += `<div contenteditable="true">${text}</div><button class="delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg></button><button class="color"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M576 320C576 320.9 576 321.8 576 322.7C575.6 359.2 542.4 384 505.9 384L408 384C381.5 384 360 405.5 360 432C360 435.4 360.4 438.7 361 441.9C363.1 452.1 367.5 461.9 371.8 471.8C377.9 485.6 383.9 499.3 383.9 513.8C383.9 545.6 362.3 574.5 330.5 575.8C327 575.9 323.5 576 319.9 576C178.5 576 63.9 461.4 63.9 320C63.9 178.6 178.5 64 320 64C461.4 64 576 178.6 576 320zM192 352C192 334.3 177.7 320 160 320C142.3 320 128 334.3 128 352C128 369.7 142.3 384 160 384C177.7 384 192 369.7 192 352zM192 256C209.7 256 224 241.7 224 224C224 206.3 209.7 192 192 192C174.3 192 160 206.3 160 224C160 241.7 174.3 256 192 256zM352 160C352 142.3 337.7 128 320 128C302.3 128 288 142.3 288 160C288 177.7 302.3 192 320 192C337.7 192 352 177.7 352 160zM448 256C465.7 256 480 241.7 480 224C480 206.3 465.7 192 448 192C430.3 192 416 206.3 416 224C416 241.7 430.3 256 448 256z"/></svg></button><button class="pin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 348.4C416.1 333.9 464 276.5 464 208C464 128.5 399.5 64 320 64C240.5 64 176 128.5 176 208C176 276.5 223.9 333.9 288 348.4L288 544C288 561.7 302.3 576 320 576C337.7 576 352 561.7 352 544L352 348.4zM328 160C297.1 160 272 185.1 272 216C272 229.3 261.3 240 248 240C234.7 240 224 229.3 224 216C224 158.6 270.6 112 328 112C341.3 112 352 122.7 352 136C352 149.3 341.3 160 328 160z"/></svg></button>`;
    // Add URL display
    const urlDisplay = document.createElement('div');
    urlDisplay.textContent = simplifiedUrl;
    urlDisplay.style.position = 'absolute';
    urlDisplay.style.bottom = '5px';
    urlDisplay.style.left = '20px';
    urlDisplay.style.right = '20px';
    urlDisplay.style.fontSize = '8px';
    urlDisplay.style.color = '#aaa';
    urlDisplay.style.textAlign = 'center';
    urlDisplay.style.lineHeight = '15px';
    urlDisplay.style.height = '15px';
    urlDisplay.contentEditable = 'false';
    note.appendChild(urlDisplay);

    document.body.appendChild(note);
    note.id = id || generateId();
   setTimeout(() => {
     const editable = note.querySelector('div[contenteditable]');
     editable.focus();
   }, 0);
  
  const resizeObserver = new ResizeObserver(() => saveNotes());
  resizeObserver.observe(note);
  note.resizeObserver = resizeObserver;
  
  // Set up event listeners - attach to the note element to handle dragging from header
  note.addEventListener('mousedown', startDrag);
  
  const editable = note.querySelector('div[contenteditable]');
  editable.addEventListener('input', saveNotes);
  editable.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      document.execCommand('bold');
    }
  });
  note.querySelector('.delete').addEventListener('click', () => { note.remove(); saveNotes(); });
  note.querySelector('.color').addEventListener('click', () => {
    note.currentColorIndex = (note.currentColorIndex + 1) % colorList.length;
    note.style.background = colorList[note.currentColorIndex];
    saveNotes();
  });
  note.querySelector('.pin').addEventListener('click', () => {
    note.style.position = note.style.position === 'fixed' ? 'absolute' : 'fixed';
    saveNotes();
  });
  
}

// Drag variables
let isDragging = false, dragNote = null, offsetX, offsetY;

// Drag functions
function startDrag(e) {
  // Don't drag if clicking inside the content area
  if (e.target.matches('div[contenteditable]')) return;
  
  // Don't drag if clicking on buttons
  if (e.target.classList.contains('delete') || 
      e.target.classList.contains('color') || 
      e.target.classList.contains('pin')) return;
  
  // Only allow dragging when clicking on the header area (top portion of the note)
  const rect = this.getBoundingClientRect();
  const clickYPos = e.clientY - rect.top;
  const headerHeight = 30; // Approximate height of the scotch tape area
  
  // Allow dragging only if click is in the header area (top ~30px of the note)
  if (clickYPos > headerHeight) return;
  
  // Don't drag if clicking on resize handle (bottom right corner)
  if (e.clientX > rect.right - 20 && e.clientY > rect.bottom - 20) return;
  
  e.preventDefault();
  isDragging = true;
  dragNote = this;
  offsetX = e.clientX - this.offsetLeft;
  offsetY = e.clientY - this.offsetTop;
  document.body.style.userSelect = 'none';
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}
function drag(e) {
  if (!isDragging) return;
  dragNote.style.left = (e.clientX - offsetX) + 'px';
  dragNote.style.top = (e.clientY - offsetY) + 'px';
}
function stopDrag() {
  if (isDragging) saveNotes();
  isDragging = false;
  dragNote = null;
  document.body.style.userSelect = '';
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
}

// Save notes
async function saveNotes() {
  const notes = Array.from(document.querySelectorAll('.sticky-note')).map(note => {
    const originalText = note.querySelector('div[contenteditable]').innerHTML;
    const metadata = `<!-- x:${note.offsetLeft},y:${note.offsetTop},colorIndex:${note.currentColorIndex},width:${note.offsetWidth},height:${note.offsetHeight},pinned:${note.style.position === 'fixed'},url:${simplifiedUrl} -->`;
    const fullText = metadata + originalText;
    return {
      id: note.id,
      text: fullText,
      timestamp: new Date().toISOString(),
      created_at: note.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      archived: false
    };
  });
  
  // Get all notes from localStorage
  const allNotesStr = localStorage.getItem(globalKey);
  const allNotes = allNotesStr ? JSON.parse(allNotesStr) : [];
  
  // Update or add - since global, replace all for this site
  const otherNotes = allNotes.filter(n => {
    const parsed = parseNote(n);
    return parsed.url !== simplifiedUrl;
  });
  const updatedAllNotes = otherNotes.concat(notes);
  
  // Save to localStorage synchronously
  localStorage.setItem(globalKey, JSON.stringify(updatedAllNotes));
  
  // Also save to chrome.storage for backup
  chrome.storage.local.set({ [globalKey]: updatedAllNotes });
  
  needsSync = true;
  
  // Sync with server if user has enabled online sync (non-blocking)
  syncNotesWithServer();
}

// Add floating button based on user settings
async function initializeFloatingButton() {
  // Get user preference
  const options = await chrome.storage.sync.get(['showFloatingButton']);
  const showFloatingButton = options.showFloatingButton !== false; // Default to true
  
  if (showFloatingButton) {
    const addBtn = document.createElement('button');
    addBtn.id = 'add-note';
    addBtn.textContent = '+';
    document.body.appendChild(addBtn);
    addBtn.addEventListener('click', () => {
      const pos = findOptimalPosition();
      createNote(pos.x, pos.y);
    });
  }
}

// Synchronization functions
async function syncNotesWithServer() {
  try {
    const syncResult = await chrome.storage.sync.get(['syncOnline']);
    const syncOnline = syncResult.syncOnline || false;
    
    if (!syncOnline) {
      return;
    }
    
    const sessionId = await getSessionId();
    
    const allNotesStr = localStorage.getItem(globalKey);
    const allNotes = allNotesStr ? JSON.parse(allNotesStr) : [];
    
    const response = await fetch('https://mondary.design/pk/pknotes/backend/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        action: 'import_notes',
        notes: allNotes,
        tagDescriptions: [],
        favoriteTags: [],
        settings: {sortOldestFirst: false, archiveBelow: true, showArchived: false, language: null}
      })
    });
    
    const res = await response.json();
    if (res.status === 'success') {
      console.log('Notes synced with server successfully');
      needsSync = false;
    } else {
      console.error('Sync failed:', res.message);
    }
  } catch (error) {
    console.error('Sync error:', error);
  }
}

// Function to load notes from server
async function loadNotesFromServer() {
  try {
    const sessionId = await getSessionId();
    
    const response = await fetch('https://mondary.design/pk/pknotes/backend/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        action: 'load'
      })
    });
    
    const result = await response.json();
    if (result.messages) {
      // Map messages to notes
      const notes = result.messages.map(msg => ({
        id: msg.id,
        text: msg.text,
        timestamp: msg.timestamp,
        created_at: msg.created_at,
        updated_at: msg.updated_at,
        archived: msg.archived
      }));
      // Save to localStorage
      localStorage.setItem(globalKey, JSON.stringify(notes));

      // Clear existing notes
      document.querySelectorAll('.sticky-note').forEach(note => note.remove());

      // Display site notes
      notes.forEach(note => {
        const parsed = parseNote(note);
        if (parsed.url === simplifiedUrl) {
          createNote(parsed.x, parsed.y, parsed.text, parsed.colorIndex, parsed.width, parsed.height, parsed.pinned, note.id);
        }
      });
    } else {
      throw new Error('Not logged in or no notes');
    }
   } catch (error) {
     console.error('Load from server error:', error);
     // Fall back to local storage
     const allNotesStr = localStorage.getItem(globalKey);
     const allNotes = allNotesStr ? JSON.parse(allNotesStr) : [];
     allNotes.forEach(note => {
       const parsed = parseNote(note);
       if (parsed.url === simplifiedUrl) {
         createNote(parsed.x, parsed.y, parsed.text, parsed.colorIndex, parsed.width, parsed.height, parsed.pinned, note.id);
       }
     });
   }
}

// Initialize the floating button
initializeFloatingButton();

// Function to ensure notes don't overlap the bottom reserved area
function ensureNotesInBounds() {
  const viewportHeight = window.innerHeight;
  const reservedBottomSpace = 50; // Space reserved for URL display
  
  document.querySelectorAll('.sticky-note').forEach(note => {
    const rect = note.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(note);
    let noteTop = parseFloat(computedStyle.top) || rect.top;
    const noteHeight = rect.height;
    
    // Check if the note is too close to the bottom
    if (noteTop + noteHeight > viewportHeight - reservedBottomSpace) {
      // Adjust position to stay within bounds
      noteTop = viewportHeight - reservedBottomSpace - noteHeight;
      if (noteTop < 0) noteTop = 20; // Minimum top position
      note.style.top = noteTop + 'px';
      // Save the adjusted position
      setTimeout(saveNotes, 0);
    }
  });
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'createNote') {
    const pos = findOptimalPosition();
    createNote(pos.x, pos.y);
  } else if (message.action === 'syncNotesWithServer') {
    // Synchronize notes with server when requested
    syncNotesWithServer()
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keeps the message channel open for async response
  } else if (message.action === 'manualSync') {
    // Same as syncNotesWithServer but triggered manually
    syncNotesWithServer()
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keeps the message channel open for async response
  }
});

// Ensure notes stay within bounds when the viewport changes (e.g. on resize)
window.addEventListener('resize', ensureNotesInBounds);