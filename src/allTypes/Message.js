import { objectType } from '@nexus/schema';
import { User } from './User';
import { Room } from './Room';

export const Message = objectType({
	name: 'Message',
	definition(t) {
		t.id('_id');
		t.string('text');
		t.string('image', { nullable: true });
		t.string('file', { nullable: true });
		t.string('video', { nullable: true });
		t.field('room', {
			type: Room,
		});
		t.field('user', {
			type: User,
		});
		t.float('createdAt');
	},
});
