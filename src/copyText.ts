function getHighlightedText(): string {
    return window.getSelection()?.toString() ?? '';
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'getSelectedText')
            sendResponse({data: getHighlightedText()});
    }
);