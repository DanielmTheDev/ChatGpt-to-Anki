import { ImportMessage } from './message/importMessage';
import { MessageType } from './message/messageType';
import { createNotes } from './createNotes';

function getHighlightedText(): string {
	return window.getSelection()?.toString() ?? '';
}

console.log('Copy text content script ready');

chrome.runtime.onMessage.addListener((request: ImportMessage, sender, sendResponse) => {
	console.log('Received message on CopyText', request);
	if (request.messageType === MessageType.Import) {
		// const copiedText = getHighlightedText();
		// const notes = createNotes(copiedText);
		// show input for deck and tag
		// send back to background script
		// from there, save deck and tag selection for next time and add to anki

		fetch(chrome.runtime.getURL('importForm.html'))
			.then(response => response.text())
			.then(html => {
				const div = document.createElement('div');
				div.innerHTML = html;
				document.body.appendChild(div);
			});
	}
	sendResponse({ data: 'Message processed' });
});