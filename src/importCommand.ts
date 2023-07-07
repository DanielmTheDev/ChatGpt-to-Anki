﻿import { constants } from './constants';
import { transformDeckData } from './transformDeckData';
import { AnkiConnectResult } from './ankiConnectResult';

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
	console.log({ decksResult, tagsResult });
	chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
		chrome.tabs.sendMessage(tabs[0].id ?? 0, { message: constants.messages.getSelectedText }, response => {
			// choose from available decks
			// choose from available tags or create new one
			// save last selection
			// add notes
			// rely on https://ankiweb.net/shared/info/1259478414 to display code correctly
			const notesData = transformDeckData((response.data as string));
			console.log(notesData);
		});
	});
}

async function getAnkiDecks(): Promise<AnkiConnectResult<string[]>> {
	return await getFromAnkiConnect('deckNames');
}

async function getAnkiTags(): Promise<AnkiConnectResult<string[]>> {
	return await getFromAnkiConnect('getTags');
}

async function getFromAnkiConnect<T>(action: string): Promise<AnkiConnectResult<T>> {
	const response = await fetch('http://localhost:8765', {
		method: 'Post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'action': action,
			'version': 6
		})
	});
	return response.json();
}
