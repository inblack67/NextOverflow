import { objectType } from '@nexus/schema';
import { User } from './User';

export const File = objectType({
    name: 'File',
    definition(t) {
        t.id('_id');
        t.string('filename');
        t.string('mimetype');
        t.string('encoding');
        t.field('user', {
            type: User
        });
        t.string('createdAt');
    }
})