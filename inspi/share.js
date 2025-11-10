// Share functionality
const button = document.getElementById("action");
const title = document.getElementById("title");
const subtext = document.getElementById("subtext");
const url = document.getElementById("url");
const link = url ? url.href : '';

if (!button || !title || !subtext) {
    console.error("share.html elements not found");
} else {
    //get the url
    title.innerText = "You've been shared sticky notes";
    button.innerText = "View Notes";
    subtext.innerText = "Notes are deleted after 24h.";
    button.href = "#";
    button.onclick = function () {
        const params = new URL(document.location.href).searchParams;
        const id = params.get("n");
        chrome.runtime.sendMessage({ message: "move", url: link, list_id: id });
    };
}