import { AnkiConnectResult } from './ankiConnectResult';

export async function getAnkiDecks(): Promise<AnkiConnectResult<string[]>> {
	return await getFromAnkiConnect('deckNames');
}

export async function getAnkiTags(): Promise<AnkiConnectResult<string[]>> {
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