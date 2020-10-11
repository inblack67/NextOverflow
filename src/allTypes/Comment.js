import { objectType } from '@nexus/schema';
import { Question } from './Question';
import { User } from './User';

export const Comment = objectType({
	name: 'Comment',
	definition(t) {
		t.id('_id');
		t.string('content');
		t.field('question', {
			type: Question,
		});
		t.field('user', {
			type: User,
		});
		t.float('createdAt');
	},
});
