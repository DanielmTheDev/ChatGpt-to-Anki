import { ImportMessage } from './message/importMessage';
import { MessageType } from './message/messageType';

// todo
// show input for deck and tag
// send back to background script
// from there, save deck and tag selection for next time and add to anki
// rely on https://ankiweb.net/shared/info/1259478414 to display code correctly

function getHighlightedText(): string {
	return window.getSelection()?.toString() ?? '';
}

console.log('Copy text content script ready');

chrome.runtime.onMessage.addListener((request: ImportMessage, sender, sendResponse) => {
	console.log('Received message on CopyText', request);
	if (request.messageType === MessageType.Import) {
		// const copiedText = getHighlightedText();
		// const notes = createNotes(copiedText);

		renderFormIframe();
	}
	sendResponse({ data: 'Message processed' });
});

function renderFormIframe(): void {
	const iframe = document.createElement('iframe');
	iframe.src = chrome.runtime.getURL('importForm.html');
	iframe.style.position = 'fixed';
	iframe.style.right = '5px';
	iframe.style.top = '5px';
	iframe.style.width = '300px';
	iframe.style.height = '200px';
	iframe.style.border = 'none';
	document.body.appendChild(iframe);
}
