/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/stickies/stickies.ts":
/*!**********************************!*\
  !*** ./src/stickies/stickies.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadCurrentPageNotes: () => (/* binding */ loadCurrentPageNotes),
/* harmony export */   registerStickies: () => (/* binding */ registerStickies)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/stickies/storage.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var defaultTheme = {
    headerColor: "#ffeb82",
    bodyColor: "#fff3ab",
    textColor: "#433733",
};

// Palette de couleurs disponibles pour les notes
var colorPalette = [
    { header: "#ffeb82", body: "#fff3ab", name: "yellow" },      // Jaune
    { header: "#d5e8d4", body: "#e6f2e8", name: "green" },       // Vert
    { header: "#dae8fc", body: "#e9f4fb", name: "blue" },        // Bleu
    { header: "#f8cecc", body: "#fde0dd", name: "red" },         // Rouge
    { header: "#e1d5e7", body: "#f2e5f0", name: "purple" },      // Violet
    { header: "#ffe6cc", body: "#fff0e6", name: "orange" }       // Orange
];
var icons = {
    ellipsis: "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z\" fill=\"#000000\"/>\n<path d=\"M12 6.75C12.9665 6.75 13.75 5.9665 13.75 5C13.75 4.0335 12.9665 3.25 12 3.25C11.0335 3.25 10.25 4.0335 10.25 5C10.25 5.9665 11.0335 6.75 12 6.75Z\" fill=\"#000000\"/>\n<path d=\"M12 20.75C12.9665 20.75 13.75 19.9665 13.75 19C13.75 18.0335 12.9665 17.25 12 17.25C11.0335 17.25 10.25 18.0335 10.25 19C10.25 19.9665 11.0335 20.75 12 20.75Z\" fill=\"#000000\"/>\n</svg>",
    delete: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" style=\"width: 16px; height: 16px; max-height: 16px; fill: currentColor; vertical-align: middle;\"><path d=\"M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H344.9c25.3 0 46.3-19.7 47.9-45L416 128z\"/></svg>",
    bold: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l48 0 16 0 128 0c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128L96 480l-16 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-160L48 96 32 96C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64L112 96l0 128 112 0zM112 288l0 128 144 0c35.3 0 64-28.7 64-64s-28.7-64-64-64l-32 0-112 0z"/></svg>',
    trash: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z\"/></svg>",
    question: "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9 10C9 9.40666 9.17595 8.82664 9.50559 8.33329C9.83524 7.83994 10.3038 7.45543 10.852 7.22836C11.4001 7.0013 12.0033 6.94189 12.5853 7.05765C13.1672 7.1734 13.7018 7.45912 14.1213 7.87868C14.5409 8.29824 14.8266 8.83279 14.9424 9.41473C15.0581 9.99667 14.9987 10.5999 14.7716 11.1481C14.5446 11.6962 14.1601 12.1648 13.6667 12.4944C13.1734 12.8241 12.5933 13 12 13V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<circle cx=\"12\" cy=\"17\" r=\"1\" fill=\"#000000\"/>\n</svg>",

};
function createNotePad(note_id, x, y, text_content, color_index) {
    var _this = this;
    if (text_content === void 0) { text_content = null; }
    if (color_index === void 0) { color_index = 0; }
    
    var currentColor = colorPalette[color_index];
    if (!currentColor) {
        currentColor = colorPalette[0];  // Default to first color if index is invalid
        color_index = 0;
    }
    
    var root = document.createElement("div");
    root.style.position = "absolute";
    root.style.top = "0";
    root.style.left = "0";
    var shadow = root.attachShadow({ mode: "open" });
    var note_container = document.createElement("div");
    var dragger = document.createElement("div");
    var textarea = document.createElement("textarea");
    if (text_content !== null && text_content !== undefined) {
        textarea.value = text_content;
    }
    dragger.style.gap = "2px";
    function addOption(title, onclick) {
        var el = document.createElement("a");
        el.innerHTML = title;
        el.style.width = "25px";
        el.style.height = "20px";
        el.style.cursor = "pointer";
        el.onclick = onclick;
        dragger.appendChild(el);
    }
    // Add color palette icon (SVG version of Font Awesome palette icon with proper sizing)
    var colorIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; max-height: 16px; cursor: pointer; fill: currentColor; vertical-align: middle;"> <path d="M490.6 0c-8.5 0-16.6 3.5-22.6 9.6L377.4 100.3l-96.1-96.1L372 10.6c6-6 14.1-9.6 22.6-9.6c8.5 0 16.6 3.5 22.6 9.6l19.8 19.8c12.5 12.5 12.5 32.8 0 45.3L391.7 130.6c-12.5 12.5-32.8 12.5-45.3 0l-96.1-96.1L10.6 453.4c-12.5 12.5-12.5 32.8 0 45.3l19.8 19.8c12.5 12.5 32.8 12.5 45.3 0l249.7-249.7 96.1 96.1c12.5 12.5 32.8 12.5 45.3 0l55.4-55.4c12.5-12.5 12.5-32.8 0-45.3L490.6 9.6C496.6 3.5 500 0 508 0s11.4 3.5 17.4 9.6l19.8 19.8c12.5 12.5 12.5 32.8 0 45.3L453.4 166.6c-12.5 12.5-32.8 12.5-45.3 0l-96.1-96.1L453.4 32.6c6-6 14.1-9.6 22.6-9.6z"/></svg>';
    addOption(colorIcon, function () {
        // Cycle to next color in palette
        var nextColorIndex = (color_index + 1) % colorPalette.length;
        var nextColor = colorPalette[nextColorIndex];
        
        note_container.style.backgroundColor = nextColor.body;
        dragger.style.backgroundColor = nextColor.header;
        
        // Update the color index for this note
        color_index = nextColorIndex;
        
        // Save updated color to storage
        (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveNote)({
            id: note_id,
            url: (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentCleanUrl)(),
            text: textarea.value,
            x: note_container.style.left,
            y: note_container.style.top,
            color_index: color_index  // Store color selection with the note
        });
    });
    
    addOption(icons.delete, function () {
        note_container.remove();
        (0,_storage__WEBPACK_IMPORTED_MODULE_1__.removeNote)(note_id);
    });
    
    // Removed discord chat option
    dragger.style.justifyContent = "flex-end";
    dragger.style.display = "flex";
    note_container.style.position = "absolute";
    note_container.style.display = "flex";
    note_container.style.resize = "both";
    note_container.style.zIndex = "9999";
    note_container.style.width = "200px";
    note_container.style.top = y;
    note_container.style.left = x;
    note_container.style.height = "400px";
    note_container.style.display = "flex";
    note_container.style.flexDirection = "column";
    note_container.style.height = "200px";
    note_container.style.minWidth = "150px";
    note_container.style.minHeight = "150px";
    note_container.style.overflow = "hidden";
    note_container.style.backgroundColor = currentColor.body;
    // also set min sizes and sizes
    textarea.style.resize = "none !important";
    textarea.style.flexGrow = "1";
    textarea.style.width = "100%";
    textarea.style.background = "none";
    textarea.placeholder = "Type your note here";
    textarea.style.resize = "none";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    //set the dragger styles
    dragger.style.backgroundColor = currentColor.header;
    dragger.style.height = "25px";
    dragger.style.width = "100%";
    dragger.style.cursor = "move";
    note_container.appendChild(dragger);
    note_container.appendChild(textarea);
    note_container.style.x = x + "px";
    note_container.style.y = y + "px";
    document.body.appendChild(root);
    shadow.appendChild(note_container);
    var isDragging = false;
    var offsetX = 0, offsetY = 0;
    textarea.addEventListener("keydown", function (e) {
        //this prevents events being fired elsewhere in
        //window while typing in box ex) space causes pausing youtube video
        e.stopPropagation();
    });
    var timer;
    textarea.addEventListener("keyup", function (e) {
        clearTimeout(timer);
        timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveNote)({
                    id: note_id,
                    url: (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentCleanUrl)(),
                    text: textarea.value,
                    x: note_container.style.left,
                    y: note_container.style.top,
                    color_index: color_index  // Include color selection when saving
                });
                return [2 /*return*/];
            });
        }); }, 1000);
    });
    note_container.addEventListener("mouseover", function (e) {
        note_container.style.opacity = "1";
    });
    note_container.addEventListener("mouseout", function (e) {
        note_container.style.opacity = "0.8";
    });
    dragger.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - note_container.offsetLeft;
        offsetY = e.clientY - note_container.offsetTop;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
    function onMouseMove(e) {
        if (!isDragging)
            return;
        note_container.style.left = "".concat(e.clientX - offsetX, "px");
        note_container.style.top = "".concat(e.clientY - offsetY, "px");
    }
    function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveNote)({
            id: note_id,
            url: (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentCleanUrl)(),
            text: textarea.value,
            x: note_container.style.left,
            y: note_container.style.top,
            color_index: color_index  // Include color selection when saving
        }).catch(function () { return alert("Could not save note. Please contact developers."); });
    }
}
function randomOffset() {
    var sign = Math.random() < 0.5 ? 1 : -1;
    var offset = Math.random() * 50 * sign;
    return offset;
}
function registerStickies() {
    chrome.runtime.onMessage.addListener(function (message, sender, res) {
        if (message == "create-note") {
            //create new note with default color (yellow - index 0)
            var x = window.innerWidth / 2 + 3 * randomOffset();
            var y = window.scrollY + window.innerHeight / 2 + 3 * randomOffset();
            createNotePad(Date.now(), x + "px", y + "px", null, 0);
        }
        else if (message == "urlchange") {
            loadCurrentPageNotes();
        }
    });
}
function loadCurrentPageNotes() {
    var url = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentCleanUrl)();
    (0,_storage__WEBPACK_IMPORTED_MODULE_1__.getAllNotes)(url).then(function (notes) {
        notes.forEach(function (note) {
            // Use the stored color index or default to 0
            var colorIndex = note.color_index !== undefined ? note.color_index : 0;
            createNotePad(note.id, note.x, note.y, note.text, colorIndex);
        });
    });
}



/***/ }),

/***/ "./src/stickies/storage.ts":
/*!*********************************!*\
  !*** ./src/stickies/storage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportNotes: () => (/* binding */ exportNotes),
/* harmony export */   getAllNotes: () => (/* binding */ getAllNotes),
/* harmony export */   removeNote: () => (/* binding */ removeNote),
/* harmony export */   saveNote: () => (/* binding */ saveNote)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var storage = chrome.storage.local;
function saveFile(textContent, fileName) {
    var blob = new Blob([textContent], { type: "text/plain" });
    var anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.download = fileName;
    var url = window.URL.createObjectURL(blob);
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
}
function removeNote(id) {
    // Removed analytics tracking
    storage.get({ savedNotes: [] }, function (result) {
        var notes = result.savedNotes;
        var index = notes.findIndex(function (note) { return note.id == id; });
        if (index > -1) {
            notes.splice(index, 1);
        }
        storage.set({ savedNotes: notes }, function () { });
    });
}
function getAllNotes(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    storage.get({ savedNotes: [] }, function (result) {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        }
                        else {
                            if (url) {
                                var filtered = result.savedNotes.filter(function (note) { return note.url === url; });
                                resolve(filtered);
                            }
                            else {
                                resolve(result.savedNotes);
                            }
                        }
                    });
                })];
        });
    });
}
function saveNote(old_note) {
    return __awaiter(this, void 0, void 0, function () {
        var result, notes, index, message, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storage.get({ savedNotes: [] })];
                case 1:
                    result = _a.sent();
                    notes = result.savedNotes || [];
                    index = notes.findIndex(function (note) { return note.id === old_note.id; });
                    if (index > -1) {
                        notes.splice(index, 1);
                    }
                    index = notes.findIndex(function (note) { return note.x === old_note.x && note.y == old_note.y; });
                    if (index > -1) {
                        notes.splice(index, 1);
                    }
                    notes.push({
                        id: old_note.id,
                        url: old_note.url,
                        x: old_note.x,
                        y: old_note.y,
                        text: old_note.text,
                        color_index: old_note.color_index !== undefined ? old_note.color_index : 0,  // Default to yellow if not specified
                    });
                    message = "";
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, storage.set({ savedNotes: notes })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    message = "Out of space";
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, message];
            }
        });
    });
}
function exportNotes(url, filename) {
    getAllNotes(url).then(function (notes) {
        var body = "Url: " + url + "\n";
        body += serializeNotes(notes);
        saveFile(body, filename);
    });
}
function serializeNote(note) {
    var pos = "(".concat(note.x, ",").concat(note.y, ")");
    return "".concat(pos, ": ").concat(note.text);
}
function serializeNotes(notes) {
    if (notes.length == 0) {
        return "No notes to save";
    }
    var result = "";
    result += "Last updated: ".concat(new Date().toLocaleTimeString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }), "\n\n");
    notes.forEach(function (note) {
        result += serializeNote(note) + "\n";
    });
    return result;
}



/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateHeight: () => (/* binding */ calculateHeight),
/* harmony export */   calculateWidth: () => (/* binding */ calculateWidth),
/* harmony export */   getCurrentCleanUrl: () => (/* binding */ getCurrentCleanUrl)
/* harmony export */ });
function getCurrentCleanUrl() {
    var url = window.location.href.split("&")[0];
    url = url.split("#")[0];
    return url;
}
function calculateWidth() {
    var body = document.body, html = document.documentElement;
    var width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
    return width;
}
function calculateHeight() {
    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return height;
}



/***/ }),

/***/ "./src/youtube/index.ts":
/*!******************************!*\
  !*** ./src/youtube/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startYoutubeNotes: () => (/* binding */ startYoutubeNotes)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Converts a time duration in seconds to a formatted string in the format "HH:MM:SS" or "MM:SS".
 *
 * @param {number} seconds - The time duration in seconds to be converted.
 *
 * @returns {string} A formatted string representing the time duration.
 *
 * - If the duration includes hours, the format will be "HH:MM:SS".
 * - If the duration is less than an hour, it will return "MM:SS".
 * - Hours, minutes, and seconds are always padded with leading zeros to ensure two digits.
 */
function formatSeconds(seconds) {
    seconds = Math.floor(seconds);
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    var formattedHours = String(hours).padStart(2, "0");
    var formattedMinutes = String(minutes).padStart(2, "0");
    var formattedSeconds = String(remainingSeconds).padStart(2, "0");
    if (seconds < 3600) {
        return "".concat(formattedMinutes, ":").concat(formattedSeconds);
    }
    return "".concat(formattedHours, ":").concat(formattedMinutes, ":").concat(formattedSeconds);
}
function save(notes) {
    var _a;
    chrome.storage.local.set((_a = {}, _a[getVideoId()] = notes, _a), function () {
        if (chrome.runtime.lastError) {
            alert("Could not save notes");
        }
    });
}
function renderNote(parent, note) {
    var el = document.createElement("div");
    el.onclick = function (e) {
        document.querySelector("video").currentTime = note.timestamp;
    };
    el.classList.add("segment");
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.gap = "12px";
    el.style.cursor = "pointer";
    el.style.paddingLeft = "14px";
    el.style.paddingRight = "14px";
    el.style.paddingTop = "8px";
    el.style.paddingBottom = "8px";
    el.style.fontSize = "12px";
    var originalColor = el.style.backgroundColor;
    var del = document.createElement("button");
    del.innerText = "✕";
    del.style.border = "none";
    del.style.visibility = "hidden";
    del.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        el.remove();
        chrome.storage.local.get([getVideoId()], function (res) {
            if (chrome.runtime.lastError) {
                console.error("Unexpected error occured probably out of storage");
                return;
            }
            var notes = res[getVideoId()].filter(function (n) {
                return !(n.content === note.content && n.timestamp === note.timestamp);
            });
            save(notes);
        });
    };
    el.onmouseover = function () {
        del.style.visibility = "visible";
        el.style.backgroundColor = "#f2f2f2";
    };
    el.onmouseout = function () {
        del.style.visibility = "hidden";
        el.style.backgroundColor = originalColor;
    };
    var timestamp = document.createElement("div");
    timestamp.classList.add("ytd-transcript-segment-renderer");
    timestamp.classList.add("segment-timestamp");
    timestamp.style.maxHeight = "fit-content";
    timestamp.innerText = formatSeconds(note.timestamp);
    var text = document.createElement("p");
    text.innerText = note.content;
    text.style.wordBreak = "break-word";
    text.classList.add("ytd-transcript-segment-renderer");
    text.classList.add("segment-text");
    text.style.flexGrow = "1";
    el.style.display = "flex";
    el.appendChild(timestamp);
    el.appendChild(text);
    el.appendChild(del);
    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
}
function getVideoId() {
    return window.location.href.split("watch?v=")[1];
}
function startYoutubeNotes() {
    var checkElementsInterval = setInterval(function () {
        var _this = this;
        var sidebar = document.getElementById("secondary");
        var video = document.querySelector("video");
        if (sidebar && video) {
            var note_container = document.getElementById("stickynoteplus--youtube");
            if (note_container) {
                //refresh the dom element
                clearInterval(checkElementsInterval);
                note_container.remove();
                startYoutubeNotes();
                return;
            }
            //the bordered container. Contains the notes, header, and footer
            var container = document.createElement("div");
            container.id = "stickynoteplus--youtube";
            container.classList.add("style-scope");
            container.classList.add("ytd-engagement-panel-section-list-renderer");
            //contains the title and description
            var header = document.createElement("div");
            header.style.height = "48px";
            header.style.padding = "12px";
            header.style.paddingBottom = "4px";
            var title_1 = document.createElement("h1");
            title_1.innerText = "Take Notes On Youtube";
            var p = document.createElement("p");
            p.style.fontSize = "12px";
            p.style.marginTop = "5px";
            header.appendChild(title_1);
            header.appendChild(p);
            container.appendChild(header);
            container.style.maxHeight = "var(--ytd-watch-flexy-panel-max-height)";
            container.style.marginBottom = "var(--ytd-margin-6x)";
            container.style.borderRadius = "12px";
            container.style.border = "1px solid var(--yt-spec-10-percent-layer)";
            container.style.display = "flex";
            container.style.flexDirection = "column";
            container.style.marginBottom = "var(--ytd-margin-6x)";
            var inner_1 = document.createElement("div");
            inner_1.style.flexGrow = "1";
            inner_1.style.overflowY = "scroll";
            inner_1.style.overflowX = "wrap";
            //inner.style.borderTop = "1px solid var(--yt-spec-10-percent-layer)";
            //inner.style.borderBottom = "1px solid var(--yt-spec-10-percent-layer)";
            var a = document.createElement("a");
            a.classList.add("yt-spec-button-shape-next");
            a.classList.add("yt-spec-button-shape-next--filled");
            a.classList.add("yt-spec-button-shape-next--call-to-action");
            a.classList.add("yt-spec-button-shape-next--size-m");
            a.classList.add("yt-spec-button-shape-next--call-to-action");
            var paid = true;
            chrome.runtime.sendMessage({ message: "is-paid" }, function () { });
            if (!paid) {
                var notes = [
                    {
                        timestamp: 30,
                        content: "Take notes and associate them with timesteps of videos",
                    },
                    {
                        timestamp: 158,
                        content: "Notes will show up here when you take them",
                    },
                ];
                notes.forEach(function (note) { return renderNote(inner_1, note); });
                p.innerText = "Unlock PKsticky Pro to take notes on youtube";
                a.innerText = "Upgrade Now";
                a.onclick = function () {
                    // Removed opening options page
                };
            }
            else if (paid) {
                container.appendChild(inner_1);
                var notes_1 = [];
                chrome.storage.local.get([getVideoId()], function (res) {
                    console.log("getting");
                    if (chrome.runtime.lastError) {
                        alert("Error retrieving notes for this page");
                        return;
                    }
                    if (!notes_1 || !res[getVideoId()]) {
                        return;
                    }
                    notes_1 = res[getVideoId()];
                    notes_1.sort(function (a, b) { return a.timestamp - b.timestamp; });
                    notes_1.forEach(function (note) { return renderNote(inner_1, note); });
                });
                p.innerText = "Create notes attached to the current time";
                a.innerText = "Add Note";
                a.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                    var time, content;
                    return __generator(this, function (_a) {
                        time = Math.max(0, Math.floor(video.currentTime - 1));
                        console.log(time);
                        content = window.prompt("Type your note here");
                        if (content == null) {
                            return [2 /*return*/];
                        }
                        notes_1.push({
                            timestamp: time,
                            content: content,
                        });
                        save(notes_1);
                        renderNote(inner_1, { timestamp: time, content: content });
                        return [2 /*return*/];
                    });
                }); };
                var input = document.createElement("input");
                input.style.backgroundColor = "var(--yt-spec-additive-background)";
                input.style.borderRadius = "18px";
                input.style.fontSize = "14px";
            }
            var footer = document.createElement("div");
            footer.style.height = "48px";
            footer.style.padding = "12px";
            footer.style.paddingBottom = "4px";
            footer.appendChild(a);
            container.appendChild(footer);
            sidebar.prepend(container);
            clearInterval(checkElementsInterval); // Stop the interval once elements are found
        }
    }, 200); // Adjust the interval (in milliseconds) as needed
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./youtube */ "./src/youtube/index.ts");
/* harmony import */ var _stickies_stickies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stickies/stickies */ "./src/stickies/stickies.ts");
//Known Issues:
//- Does not work with pdf or local files (intentional)
//- google mail export button opens blob url instead of downloading automatically
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



(0,_stickies_stickies__WEBPACK_IMPORTED_MODULE_2__.registerStickies)();
//logic for loading a new page
function loadPage() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(window.location.href);
            console.log(window.location.hostname);
            if (window.location.hostname === "www.youtube.com" &&
                window.location.href.includes("watch")) {
                console.log("starting youtube notes");
                (0,_youtube__WEBPACK_IMPORTED_MODULE_1__.startYoutubeNotes)();
            }
            else {
                (0,_stickies_stickies__WEBPACK_IMPORTED_MODULE_2__.loadCurrentPageNotes)();
                chrome.runtime.sendMessage({ event: "urlchange" });
            }
            return [2 /*return*/];
        });
    });
}
window.addEventListener("DOMContentLoaded", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("DOM TRIGGERD!!!");
        return [2 /*return*/];
    });
}); });
window.addEventListener("yt-navigation-start", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("YT-NAVIGATE");
        return [2 /*return*/];
    });
}); });
window.addEventListener("popstate", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("pop state");
        return [2 /*return*/];
    });
}); });
window.addEventListener("load", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("LOAD TRIGGERED!!!");
                return [4 /*yield*/, loadPage()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var lastUrl = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentCleanUrl)();
new MutationObserver(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = (0,_util__WEBPACK_IMPORTED_MODULE_0__.getCurrentCleanUrl)();
                if (!(url !== lastUrl)) return [3 /*break*/, 2];
                lastUrl = url;
                return [4 /*yield*/, loadPage()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); }).observe(document, { subtree: true, childList: true });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (!request.action) {
        return false;
    }
    if (chrome.runtime.lastError) {
        console.log("LAST ERR");
    }

    if (request.action == "alert") {
        alert(request.content);
    }
    return false;
});

/******/ })()
;
//# sourceMappingURL=content.js.map