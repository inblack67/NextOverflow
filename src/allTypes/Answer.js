import { objectType } from '@nexus/schema';
import { User } from './User';
import { Question } from './Question';

export const Answer = objectType({
    name: 'Answer',
    definition(t) {
        t.id('_id');
        t.string('content');
        t.field('question', {
            type: Question
        });
        t.field('user', {
            type: User
        });
        t.string('createdAt');
    }
})