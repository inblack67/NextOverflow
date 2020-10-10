import { objectType } from '@nexus/schema';

export const Room = objectType({
	name: 'Room',
	definition(t) {
		t.id('_id');
		t.string('title');
		t.string('description');
		t.string('createdAt');
	},
});
