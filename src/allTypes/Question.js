import { objectType } from '@nexus/schema';
import { User } from './User';
import { Comment } from './Comment';
import { Answer } from './Answer';

export const Question = objectType({
    name: 'Question',
    definition(t) {
        t.id('_id');
        t.string('title');
        t.string('description');
        t.string('tags');
        t.field('user', {
            type: User
        });
        t.list.field('comments', {
            type: Comment
        });
        t.list.field('answers', {
            type: Answer
        });
        t.string('createdAt');
    }
})