# PK Sticky Notes Chrome

![Project icon](icon.png)

[🇫🇷 FR](README.md) · [🇬🇧 EN](README_en.md)

✨ Add sticky notes directly to your web pages.

## 🎯 Overview

**PK Sticky Notes Chrome** is a Chrome extension that allows you to add personal, colorful sticky notes directly to any web page. Your ideas, reminders, and annotations stay exactly where you need them!

## ✨ Features

### 📝 Note Management
- **Instant Notes** : Create notes with a simple right-click on any page
- **Persistent Notes** : Your notes are automatically saved and stay attached to their pages
- **Customization** : Choose from different colors to organize your notes
- **Intuitive Interface** : Move and resize your notes freely

### 🎨 User Experience
- **Context Menu** : Quick access via right-click
- **Clean Interface** : Minimalist design that doesn't interfere with your browsing
- **Local Storage** : All your data stays on your device, no cloud connection

### 🔧 Configuration
- **Options Page** : Customize the extension according to your needs
- **Accessible Settings** : Easily modify settings via the configuration panel

## 🚀 Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore/detail/pk-sticky-notes-chrome)
2. Click on "Add to Chrome"
3. The extension will install automatically

### In Developer Mode
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** in the top right
3. Click on **Load unpacked**
4. Select the `src` folder of this project

## 📖 Usage

### Create a Note
1. **Right Click** : Right-click anywhere on a webpage
2. **Select** : Choose "Create Note" from the context menu
3. **Write** : Type your content in the appearing note

### Manage Your Notes
- **Move** : Click and drag the note to reposition it
- **Resize** : Drag the edges of the note to change its size
- **Delete** : Use the delete button on each note
- **Change Color** : Select from available colors

## 🎯 Use Cases

### 📚 Research and Learning
- Annotate online articles with your thoughts
- Mark important passages in documents
- Create contextual reminders on resources

### 💼 Work and Productivity
- Take notes during online meetings
- Organize your ideas directly on project pages
- Keep track of your reflections while working

### 🛒 Shopping and Comparison
- Note important product features
- Compare options with notes on different pages
- Create pros/cons lists directly on product pages

### 📰 Information Monitoring
- Comment on articles with your analysis
- Mark key information in reports
- Keep track of your thoughts on blogs

## 🔒 Privacy

PK Sticky Notes Chrome respects your privacy:

- ✅ **Local Storage** : All your data is stored locally in Chrome
- ✅ **No Internet Connection** : The extension works completely offline
- ✅ **No Tracking** : No usage data collection
- ✅ **No External Servers** : Your notes never leave your browser

For more details, see our [Privacy Policy](https://mondary.design/privacy-policy-pk-sticky-notes-chrome).

## 🛠️ Development

### Project Structure
```
PKStickyNotesChrome/
├── src/                    # Extension source code
│   ├── manifest.json      # Extension configuration
│   ├── content.js         # Content scripts for notes
│   ├── background.js      # Service worker for management
│   ├── options.html       # Configuration page
│   ├── options.js         # Options page script
│   └── styles.css         # Notes CSS styles
├── store/                  # Chrome Web Store assets
│   ├── PKstickyNotes_v1.0.1.zip  # Package for publication
│   └── *.png              # Images and screenshots
└── README.md              # Documentation (this file)
```

### Technologies Used
- **HTML5/CSS3** : User interface
- **JavaScript (ES6+)** : Extension logic
- **Chrome Extension API v3** : Native Chrome APIs
- **Chrome Storage API** : Data persistence

## 🧾 Changelog

### Version 1.0.1
- 📝 README update
- 🎨 Interface improvements
- 🔧 Performance optimizations

### Version 1.0.0
- 🎉 Initial release
- ✨ Basic note features
- 📦 First publication

## 🔗 Useful Links

- **Chrome Web Store** : [Link to extension](https://chrome.google.com/webstore/detail/pk-sticky-notes-chrome)
- **Privacy Policy** : [mondary.design](https://mondary.design/privacy-policy-pk-sticky-notes-chrome)
- **Developer Website** : [mondary.design](https://mondary.design)

## 📝 License

This project is developed and maintained by [cmondary](https://mondary.design).

## 🤝 Contribution

Contributions are welcome! Feel free to:
- Report bugs
- Propose new features
- Improve documentation
- Submit pull requests

## 📧 Contact

For any questions or suggestions: [contact@mondary.design](mailto:contact@mondary.design)

---

**Developed with ❤️ by [cmondary](https://mondary.design)**