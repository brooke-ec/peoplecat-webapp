export interface Message {
	/** The chat ID this message belongs to */
	chatId: number;
	/** The text content of this message */
	content: string;
	/** The user ID of this message's author */
	senderId: number;
	/** The unix timestamp this message was sent at */
	timeSent: number;
}

export interface User {
	/** The ID of the user */
	id: number;
	/** The username of the current user */
	username: string;
	/** The display name of the current user */
	fullName: string;
	/** The path to the current user's profile picture from `https://data.nathcat.net/pfps` */
	pfpPath: string;
}

export interface Chat {
	/** Tht ID of the chat */
	chatId: number;
	/** The name of the chat */
	name: string;
	/** Unknown */
	keyId: string;
	/** The code users can use to join this public chat */
	joinCode: string;
	/** The icon of this chat */
	icon: string;
	/* The key used to encrypt messages sent in this chat  */
	key: JsonWebKey;
}
