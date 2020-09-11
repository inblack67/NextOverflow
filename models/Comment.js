const { Schema, models, model } = require('mongoose');

const CommentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Comment content is required'],
    },
    question: {
        type: Schema.ObjectId,
        ref: 'Question',
        required: [true, 'Which question this answer belongs to?']
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Who is the commentator?']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = models.Comment || model('Comment', CommentSchema);