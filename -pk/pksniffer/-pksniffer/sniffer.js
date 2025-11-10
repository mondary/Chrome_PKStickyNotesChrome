document.addEventListener('DOMContentLoaded', () => {
    const sniffer = {
        isActive: false,
        highlightedElement: null,
        infoPanel: null,
        fab: null,

        init() {
            this.createFAB();
        },

        createFAB() {
            const drawer = document.createElement('div');
            drawer.id = 'pk-sniffer-drawer';

            this.fab = document.createElement('div');
            this.fab.id = 'pk-sniffer-fab';
            this.fab.innerHTML = '<i class="fa-solid fa-crosshairs"></i>';
            this.fab.title = 'Activate PK Sniffer';
            
            drawer.appendChild(this.fab);
            document.body.appendChild(drawer);

            this.fab.addEventListener('click', () => this.toggleSniffer());
        },

        toggleSniffer() {
            this.isActive = !this.isActive;
            if (this.isActive) {
                this.fab.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                this.fab.title = 'Deactivate PK Sniffer';
                document.addEventListener('mouseover', this.handleMouseOver.bind(this), true);
                document.addEventListener('mouseout', this.handleMouseOut.bind(this), true);
                document.addEventListener('click', this.handleClick.bind(this), true);
            } else {
                this.fab.innerHTML = '<i class="fa-solid fa-crosshairs"></i>';
                this.fab.title = 'Activate PK Sniffer';
                this.removeHighlight();
                document.removeEventListener('mouseover', this.handleMouseOver.bind(this), true);
                document.removeEventListener('mouseout', this.handleMouseOut.bind(this), true);
                document.removeEventListener('click', this.handleClick.bind(this), true);
            }
        },

        handleMouseOver(e) {
            if (!this.isActive) return;
            this.removeHighlight();
            this.highlightedElement = e.target;
            this.highlightedElement.classList.add('pk-sniffer-highlight');
        },

        handleMouseOut() {
            this.removeHighlight();
        },

        removeHighlight() {
            if (this.highlightedElement) {
                this.highlightedElement.classList.remove('pk-sniffer-highlight');
                this.highlightedElement = null;
            }
        },

        handleClick(e) {
            if (!this.isActive) return;
            e.preventDefault();
            e.stopPropagation();

            const target = e.target;
            const info = this.getElementInfo(target);
            
            navigator.clipboard.writeText(info.rawText).then(() => {
                this.showNotification(`Copié : ${info.rawText.substring(0, 50)}...`);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                this.showNotification('Échec de la copie.', true);
            });

            this.toggleSniffer(); // Deactivate after selection
        },

        showNotification(message, isError = false) {
            let notification = document.getElementById('pk-sniffer-notification');
            if (!notification) {
                notification = document.createElement('div');
                notification.id = 'pk-sniffer-notification';
                document.body.appendChild(notification);
            }

            notification.textContent = message;
            notification.className = isError ? 'pk-sniffer-notification error visible' : 'pk-sniffer-notification visible';

            // Use a timeout to remove the visible class, allowing the CSS transition to play
            setTimeout(() => {
                notification.classList.remove('visible');
            }, 2000); // Keep the notification visible for 2 seconds
        },

        // displayInfo function is no longer needed as info is copied directly
        // Keeping it commented out for now, but it will be removed in a later step if confirmed.
        /*
        displayInfo(element) {
            if (!this.infoPanel) {
                this.infoPanel = document.createElement('div');
                this.infoPanel.id = 'pk-sniffer-info-panel';
                document.body.appendChild(this.infoPanel);
            }

            const info = this.getElementInfo(element);
            this.infoPanel.innerHTML = `
                <pre>${info.text}</pre>
                <button id="pk-sniffer-copy-btn">Copy</button>
            `;
            this.infoPanel.style.display = 'block';

            document.getElementById('pk-sniffer-copy-btn').addEventListener('click', () => {
                navigator.clipboard.writeText(info.rawText).then(() => {
                    alert('Copied to clipboard!');
                });
            });
        },
        */

        getElementInfo(element) {
            const tagName = element.tagName.toLowerCase();
            const id = element.id ? `#${element.id}` : '';
            const classes = Array.from(element.classList).map(c => `.${c}`).join('');
            const xpath = this.getXPath(element);

            const text = `Tag:      ${tagName}
ID:       ${element.id || '(none)'}
Classes:  ${element.className || '(none)'}
Selector: ${tagName}${id}${classes}
XPath:    ${xpath}`;
            
            const rawText = text;

            return { text, rawText };
        },

        getXPath(element) {
            // Credits to https://stackoverflow.com/a/2631931
            if (element.id !== '') {
                return `id("${element.id}")`;
            }
            if (element === document.body) {
                return element.tagName.toLowerCase();
            }

            let ix = 0;
            const siblings = element.parentNode.childNodes;
            for (let i = 0; i < siblings.length; i++) {
                const sibling = siblings[i];
                if (sibling === element) {
                    return `${this.getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${(ix + 1)}]`;
                }
                if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                    ix++;
                }
            }
        }
    };

    sniffer.init();
});
