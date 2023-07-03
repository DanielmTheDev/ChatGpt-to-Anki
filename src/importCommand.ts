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
			// console.log(response.data);
			fetch('http://localhost:8765', {
				method: 'Post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'action': 'deckNames',
					'version': 6
				}) })
				.then(response => response.json())
				.then(data => console.log(data))
				.catch((error) => {
					console.error('Error:', error);
				});
		});
	});
}
