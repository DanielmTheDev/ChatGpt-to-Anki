import { Note } from './note';

const pairSeparator = '^^^';
const answerSeparator = '|||';

export function transformDeckData(copiedText: string): Note[] {
	const pairs = copiedText.split(pairSeparator);
	return pairs.map(pair => {
		const splitPair = pair.split(answerSeparator);
		return { question: trimNewlines(splitPair[0]), answer: trimNewlines(splitPair[1]) } as Note;
	});
}

function trimNewlines(s: string): string {
	return s.replace('\n', '');
}