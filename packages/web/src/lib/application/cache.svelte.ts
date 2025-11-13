import type { Chat, Message, User } from "./peoplecat";
import { application } from "./application.svelte";
import { fetchUser } from "./authcat";
import { PacketType } from "./packet";

export class SingleCacheContainer<T> {
	protected loader: () => Promise<T>;
	protected _store = $state<T>();
	protected _fetched = $state(false);
	protected _task: Promise<T> | undefined = undefined;

	constructor(loader: () => Promise<T>) {
		this.loader = loader;
	}

	public get() {
		if (!this._fetched) this.fetch();
		return this._store as T | undefined;
	}

	public async fetch() {
		if (!this._task)
			this._task = this.loader().then((v) => {
				this.set(v);
				return v;
			});
		return await this._task;
	}

	public fetched() {
		return this._fetched;
	}

	public set(value: T) {
		this._fetched = true;
		this._store = value;
	}
}

export class KeyedCacheContainer<T> {
	protected loader: (id: number) => Promise<T>;
	protected _store = $state<Record<number, T>>({});
	protected _fetched = $state<number[]>([]);
	protected _tasks: Record<number, Promise<T>> = [];

	constructor(loader: (id: number) => Promise<T>) {
		this.loader = loader;
	}

	public get(id: number) {
		if (!(id in this._fetched)) this.fetch(id);
		return this._store[id] as T | undefined;
	}

	public async fetch(id: number) {
		if (!(id in this._tasks))
			this._tasks[id] = this.loader(id).then((v) => {
				this.set(id, v);
				return v;
			});
		return await this._tasks[id];
	}

	public fetched(id: number) {
		return this._fetched.includes(id);
	}

	public includes(id: number) {
		return id in this._store;
	}

	public set(id: number, value: T) {
		if (!this._fetched.includes(id)) this._fetched.push(id);
		this._store[id] = value;
	}
}

export class MessageCacheContainer extends KeyedCacheContainer<Message[]> {
	constructor() {
		super(async (id) => {
			application.send({
				type: PacketType.GET_MESSAGE_QUEUE,
				payload: { chatId: id },
			});

			const packets = await application.stream(PacketType.GET_MESSAGE_QUEUE);
			return packets
				.filter((p) => !("messageCount" in p.payload))
				.map((p) => p.payload) as Message[];
		});
	}

	push(id: number, value: Message) {
		if (!this.includes(id)) this.set(id, []);
		this._store[id].push(value);
	}
}

namespace Cache {
	export const users = new KeyedCacheContainer<User>(async (id) => await fetchUser(id));
	export const messages = new MessageCacheContainer();

	export const chats = new SingleCacheContainer<Record<number, Chat>>(async () => {
		application.send({
			type: PacketType.GET_CHAT_MEMBERSHIPS,
			payload: undefined,
		});

		const packets = await application.stream(PacketType.GET_CHAT_MEMBERSHIPS);
		return Object.fromEntries(packets.map((p) => [p.payload.chatId, p.payload]));
	});
}

export default Cache;
