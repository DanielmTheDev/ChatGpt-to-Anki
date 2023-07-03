import { constants } from './constants';

export function addImportCommandListener(): void {
	chrome.commands.onCommand.addListener(command => {
		if (command === constants.commands.import) {
			importToAnki();
		}
	});
}

function importToAnki(): void {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id ?? 0, { message: constants.messages.getSelectedText }, function (response) {
			// choose from available decks
			// choose from available tags or create new one
			// save last selection
			// add notes
			const transformedData = (response.data as string).split('\n');
			console.log(transformedData);
			sendRequest();
		});
	});
}

function sendRequest() {
	fetch('http://localhost:8765', {
		method: 'Post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'action': 'deckNames',
			'version': 6
		})
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch((error) => {
			console.error('Error:', error);
		});
}
