import { PeoplecatConnectionError } from "./error";

export const BACKEND_URL = "wss://nathcat.net:1234";

/**
 * Represents a client connection to the Peoplecat backend.
 */
export class PeoplecatClient {
	private socket: WebSocket | null = null;
	public ready: boolean = false;
	public get connected() {
		return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
	}

	/***
	 * Connect to the Peoplecat backend and setup event listeners
	 */
	public async connect() {
		if (this.socket) throw new PeoplecatConnectionError("Connection already established");

		this.socket = new WebSocket(BACKEND_URL);
		this.socket.addEventListener("message", this.recieve.bind(this));
		this.socket.addEventListener("error", this.error.bind(this));

		return new Promise<void>((resolve) =>
			this.socket!.addEventListener("open", () => resolve()),
		);
	}

	private error(event: Event) {
		console.error("WebSocket error:", event);
	}

	private recieve(message: MessageEvent) {
		console.log("Received message:", message.data);
	}

	/**
	 * Authenticate with the Peoplecat backend using AuthCat cookie.
	 * @param token the 'AuthCat-SSO' to authenticate with
	 */
	public authenticate(token: string) {}

	/**
	 * Authenticate with the Peoplecat backend using username and password.
	 * @param username The username of the user to log in as.
	 * @param password The password of the user to log in as.
	 */
	public login(username: string, password: string) {}
}
