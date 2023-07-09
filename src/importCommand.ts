import { constants } from './constants';
import { createNotes } from './createNotes';
import { getAnkiDecks, getAnkiTags } from './ankiConnect/ankiConnect';
import { ImportMessage } from './message/importMessage';
import { MessageType } from './message/messageType';

// todo
// choose from available decks
// choose from available tags or create new one
// save last selection
// add notes
// rely on https://ankiweb.net/shared/info/1259478414 to display code correctly

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
			const notes = createNotes((response.data as string));
			console.log(notes);
		});
	});
}

