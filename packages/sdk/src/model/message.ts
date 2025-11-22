import { BaseModel } from "./base";
import { Chat } from "./chat";
import { User } from "./user";

export interface MessageData {
	/** The chat ID this message belongs to. */
	chatId: number;
	/** The text content of this message. */
	content: string;
	/** The user ID of this message's author. */
	senderId: number;
	/** The unix timestamp this message was sent at. */
	timeSent: number;
}

export class Message extends BaseModel<MessageData> {
	/**
	 * The chat this message belongs to.
	 */
	public get chat(): Chat {
		throw new Error("Method not implemented.");
	}

	/**
	 * The {@linkcode User} who sent this message.
	 */
	public get sender(): User {
		throw new Error("Method not implemented.");
	}

	/**
	 * The date this message was sent.
	 */
	public get date(): Date {
		return new Date(this.timeSent);
	}
}
