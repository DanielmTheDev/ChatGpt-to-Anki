import { ImportMessage } from './message/importMessage';
import { MessageType } from './message/messageType';

function getHighlightedText(): string {
	return window.getSelection()?.toString() ?? '';
}

console.log('Copy text content script ready');

chrome.runtime.onMessage.addListener((request: ImportMessage, sender, sendResponse) => {
	console.log('Received message', request);
	if (request.messageType === MessageType.Import)
		console.log(request.decks);
	sendResponse({ data: getHighlightedText() });
});