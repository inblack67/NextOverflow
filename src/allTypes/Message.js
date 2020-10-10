import { objectType } from '@nexus/schema';
import { User } from './User';

export const Message = objectType({
	name: 'Message',
	definition(t) {
		t.id('_id');
		t.string('text');
		t.string('url', { nullable: true });
		t.string('time');
		t.field('user', {
			type: User,
		});
		t.string('createdAt');
	},
});
