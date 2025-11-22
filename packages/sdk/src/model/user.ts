import { BaseModel } from "./base";

export interface UserData {
	/** The ID of the user. */
	id: number;

	/** The username of the user. */
	username: string;

	/** The display name of the user. */
	fullName: string;

	/** The path to the current user's profile picture from `https://data.nathcat.net/pfps` */
	pfpPath: string;
}

/**
 * Represents a user from AuthCat.
 */
export class User extends BaseModel<UserData> {
	/**
	 * The full URL to the user's profile picture.
	 */
	public get pfpUrl() {
		return `https://data.nathcat.net/pfps${this.pfpPath}`;
	}
}
