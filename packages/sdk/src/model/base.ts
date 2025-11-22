import { PeoplecatClient } from "../client";

export const BaseModel = class {
	public readonly client: PeoplecatClient;

	constructor(client: PeoplecatClient, data: Record<string, unknown>) {
		this.client = client;

		for (const key of Object.keys(data))
			Object.defineProperty(this, key, {
				get() {
					return data[key];
				},
			});
	}
} as new <T>(client: PeoplecatClient, data: T) => Readonly<T>;
