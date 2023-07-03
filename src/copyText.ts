import { constants } from './constants';

function getHighlightedText(): string {
	return window.getSelection()?.toString() ?? '';
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.message === constants.messages.getSelectedText)
			sendResponse({ data: getHighlightedText() });
	}
);