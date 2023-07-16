import { constants } from './constants';
import { getAnkiDecks, getAnkiTags } from './ankiConnect/ankiConnect';
import { ImportMessage } from './message/importMessage';
import { MessageType } from './message/messageType';

export function addImportCommandListener(): void {
	chrome.commands.onCommand.addListener(async command => {
		if (command === constants.commands.import) {
			await importToAnki();
		}
	});
}

async function importToAnki(): Promise<void> {
	const decksResult = await getAnkiDecks();
	const tagsResult = await getAnkiTags();
	const message = { messageType: MessageType.Import, decks: decksResult.result, tags: tagsResult.result } as ImportMessage;
	console.log('Created message');
	chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
		console.log('Sending message', message);
		chrome.tabs.sendMessage(tabs[0].id ?? 0, message, response => {
			console.log('Received response from message', response);
		});
	});
}

