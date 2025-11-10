// Add interactive functionality to the sticky note
document.addEventListener('DOMContentLoaded', function() {
  const stickyNote = document.querySelector('.sticky-note');
  
  // Add click-to-edit functionality for text elements
  const editableElements = document.querySelectorAll('.note-section p, .note-header h2, .note-header p');
  
  editableElements.forEach(element => {
    element.addEventListener('dblclick', function() {
      makeEditable(this);
    });
  });
  
  function makeEditable(element) {
    const originalText = element.textContent;
    const input = document.createElement('input');
    
    input.type = 'text';
    input.value = originalText;
    input.style.background = 'rgba(255, 255, 255, 0.8)';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '3px';
    input.style.padding = '2px 5px';
    input.style.fontSize = window.getComputedStyle(element).fontSize;
    input.style.fontFamily = window.getComputedStyle(element).fontFamily;
    input.style.width = '100%';
    
    element.style.display = 'none';
    element.parentNode.insertBefore(input, element);
    
    input.focus();
    input.select();
    
    function finishEditing() {
      element.textContent = input.value || originalText;
      element.style.display = '';
      input.remove();
    }
    
    input.addEventListener('blur', finishEditing);
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        finishEditing();
      }
    });
  }
  
  // Add drag functionality
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;
  
  stickyNote.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  
  function dragStart(e) {
    if (e.target.tagName === 'INPUT') return;
    
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    
    if (e.target === stickyNote || stickyNote.contains(e.target)) {
      isDragging = true;
      stickyNote.style.cursor = 'grabbing';
    }
  }
  
  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      
      xOffset = currentX;
      yOffset = currentY;
      
      stickyNote.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
  }
  
  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    stickyNote.style.cursor = 'default';
  }
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // CMD/CTRL + SHIFT + H for help
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'H') {
      e.preventDefault();
      alert('Aide mémoire:\n- Double-clic pour éditer le texte\n- Glisser-déposer pour déplacer la note');
    }
    
    // CMD/CTRL + SHIFT + P for clipboard full
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      navigator.clipboard.writeText(stickyNote.textContent).then(() => {
        showNotification('Contenu copié dans le presse-papiers');
      });
    }
  });
  
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #333;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      z-index: 1000;
      font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  // Add todo item completion functionality
  const todoItems = document.querySelectorAll('.todo p');
  todoItems.forEach(item => {
    item.addEventListener('click', function() {
      this.style.textDecoration = this.style.textDecoration === 'line-through' ? 'none' : 'line-through';
      this.style.opacity = this.style.textDecoration === 'line-through' ? '0.6' : '1';
    });
  });
});
