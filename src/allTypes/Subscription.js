import { subscriptionType, stringArg, idArg } from '@nexus/schema';
import RoomModel from '../../models/Room';
import MessageModel from '../../models/Message';
import { Room } from './Room';
import { Message } from './Message';
import { isProtected } from '../isAuthenticated';
import ErrorResponse from '../errorResponse';
import asyncHandler from '../../middlewares/asyncHandler';
import { withFilter } from 'graphql-subscriptions';
import { NEW_ROOM_MESSAGE, CHANNEL_NAME } from '../subscriptionTypes';

let count = 0;

export const Subscription = subscriptionType({
	definition(t) {
		t.field('newRoomMessage', {
			type: Message,
			args: { room: idArg() },
			subscribe: asyncHandler(
				withFilter(
					(_, args, { pubsub }) => pubsub.asyncIterator(NEW_ROOM_MESSAGE),
					(payload, args) => payload.room._id.toString() === args.room.toString(),
				),
			),
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
