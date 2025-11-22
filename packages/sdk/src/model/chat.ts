import { BaseModel } from "./base";
/**
 * Represents a chat in Peoplecat.
 */
export interface ChatData {
	/** Tht ID of the chat. */
	chatId: number;
	/** The name of the chat. */
	name: string;
	/** The icon of this chat */
	icon: string;
}

export class Chat extends BaseModel<ChatData> {
	/**
	 * The messages in this chat.
	 */
	public get messages() {
		throw new Error("Method not implemented.");
	}

	/**
	 * The full URL to the chats's icon.
	 */
	public get iconUrl() {
		return `https://data.nathcat.net/pfps${this.icon}`;
	}
}
