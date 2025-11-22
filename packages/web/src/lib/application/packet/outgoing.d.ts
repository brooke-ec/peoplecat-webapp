import type { Packet, PacketType } from ".";
import type { Message } from "../peoplecat";

export type OutgoingPacket =
	| Packet<PacketType.PING>
	| Packet<PacketType.GET_CHAT_MEMBERSHIPS>
	| Packet<
			PacketType.ERROR,
			{
				name: string;
				msg: string;
			}
	  >
	| Packet<
			PacketType.AUTHENTICATE,
			{
				/** An authenticated AuthCat session cookie */
				cookieAuth: string;
			}
	  >
	| Packet<
			PacketType.GET_MESSAGE_QUEUE,
			{
				chatId: number;
			}
	  >
	| Packet<PacketType.SEND_MESSAGE, Omit<Message, "senderId">>;
