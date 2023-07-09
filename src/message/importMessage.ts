import { MessageType } from './messageType';

export interface ImportMessage {
    messageType: MessageType
    decks: string[],
    tags: string[]
}