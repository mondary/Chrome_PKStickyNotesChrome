// Simplified URL key (without query params and hash)
const simplifiedUrl = window.location.origin + window.location.pathname;
const siteKey = 'notes_' + simplifiedUrl;

// Load existing notes
chrome.storage.local.get([siteKey], (result) => {
  const notes = result[siteKey] || [];
  notes.forEach(note => createNote(note.x, note.y, note.text, note.colorIndex || 0, note.width, note.height, note.pinned || false));
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

// Create note function
function createNote(x, y, text = '', colorIndex = 0, width = '210px', height = '110px', pinned = false) {
  const note = document.createElement('div');
  note.className = 'sticky-note';
  note.style.left = x + 'px';
  note.style.top = y + 'px';
  note.style.background = colorList[colorIndex];
  note.style.width = width;
  note.style.height = height;
  note.style.position = pinned ? 'fixed' : 'absolute';
  note.currentColorIndex = colorIndex;
  note.innerHTML = `<div contenteditable="true">${text}</div><button class="delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg></button><button class="color"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M576 320C576 320.9 576 321.8 576 322.7C575.6 359.2 542.4 384 505.9 384L408 384C381.5 384 360 405.5 360 432C360 435.4 360.4 438.7 361 441.9C363.1 452.1 367.5 461.9 371.8 471.8C377.9 485.6 383.9 499.3 383.9 513.8C383.9 545.6 362.3 574.5 330.5 575.8C327 575.9 323.5 576 319.9 576C178.5 576 63.9 461.4 63.9 320C63.9 178.6 178.5 64 320 64C461.4 64 576 178.6 576 320zM192 352C192 334.3 177.7 320 160 320C142.3 320 128 334.3 128 352C128 369.7 142.3 384 160 384C177.7 384 192 369.7 192 352zM192 256C209.7 256 224 241.7 224 224C224 206.3 209.7 192 192 192C174.3 192 160 206.3 160 224C160 241.7 174.3 256 192 256zM352 160C352 142.3 337.7 128 320 128C302.3 128 288 142.3 288 160C288 177.7 302.3 192 320 192C337.7 192 352 177.7 352 160zM448 256C465.7 256 480 241.7 480 224C480 206.3 465.7 192 448 192C430.3 192 416 206.3 416 224C416 241.7 430.3 256 448 256z"/></svg></button><button class="pin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 348.4C416.1 333.9 464 276.5 464 208C464 128.5 399.5 64 320 64C240.5 64 176 128.5 176 208C176 276.5 223.9 333.9 288 348.4L288 544C288 561.7 302.3 576 320 576C337.7 576 352 561.7 352 544L352 348.4zM328 160C297.1 160 272 185.1 272 216C272 229.3 261.3 240 248 240C234.7 240 224 229.3 224 216C224 158.6 270.6 112 328 112C341.3 112 352 122.7 352 136C352 149.3 341.3 160 328 160z"/></svg></button>`;
  document.body.appendChild(note);
  setTimeout(() => editable.focus(), 0);
  const resizeObserver = new ResizeObserver(() => saveNotes());
  resizeObserver.observe(note);
  note.resizeObserver = resizeObserver;
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
  if (e.target.closest('div[contenteditable]') || e.target.classList.contains('delete') || e.target.classList.contains('color') || e.target.classList.contains('pin')) return;
  // Don't drag if clicking on resize handle (bottom right 20x20)
  const rect = this.getBoundingClientRect();
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
function saveNotes() {
  const notes = Array.from(document.querySelectorAll('.sticky-note')).map(note => ({
    x: note.offsetLeft,
    y: note.offsetTop,
    text: note.querySelector('div[contenteditable]').innerHTML,
    colorIndex: note.currentColorIndex,
    width: note.offsetWidth + 'px',
    height: note.offsetHeight + 'px',
    pinned: note.style.position === 'fixed'
  }));
  chrome.storage.local.set({ [siteKey]: notes });
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
    addBtn.addEventListener('click', () => createNote(window.innerWidth - 220, 20));
  }
}

// Initialize the floating button
initializeFloatingButton();

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'createNote') {
    createNote(window.innerWidth - 220, 20);
  }
});