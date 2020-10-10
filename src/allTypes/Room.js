import { objectType } from '@nexus/schema';
import { Message } from './Message';
import { User } from './User';

export const Room = objectType({
	name: 'Room',
	definition(t) {
		t.id('_id');
		t.string('title');
		t.string('description');
		t.list.field('messages', {
			type: Message,
			nullable: true,
		});
		t.list.field('users', {
			type: User,
			nullable: true,
		});
		t.string('createdAt');
	},
});
