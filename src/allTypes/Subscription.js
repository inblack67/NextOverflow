import { subscriptionType, stringArg, idArg } from '@nexus/schema';
import RoomModel from '../../models/Room';
import MessageModel from '../../models/Message';
import { Room } from './Room';
import { Message } from './Message';
import { isProtected } from '../isAuthenticated';
import ErrorResponse from '../errorResponse';
import asyncHandler from '../../middlewares/asyncHandler';
import { onMessageUpdates, subscribers, getMessages } from '../subscriptionHelpers';

let count = 0;
const CHANNEL_NAME = 'COUNT';

export const Subscription = subscriptionType({
	definition(t) {
		t.list.field('messages', {
			type: Message,
			args: { room: stringArg() },
			subscribe: asyncHandler(async (parent, args, { pubsub }) => {
				const messages = await getMessages();
				console.log(messages);

				onMessageUpdates(() =>
					pubsub.publish(args.room, {
						messages,
					}),
				);

				setTimeout(
					() =>
						pubsub.publish(args.room, {
							messages,
						}),
					0,
				);

				return pubsub.asyncIterator(args.room);
			}),
		});

		t.int('count', {
			nullable: true,
			subscribe: (parent, args, { pubsub }) => {
				setInterval(() => {
					count += 1;
					pubsub.publish(CHANNEL_NAME, {
						count,
					});
				}, 1000);
				return pubsub.asyncIterator(CHANNEL_NAME);
			},
		});
	},
});
