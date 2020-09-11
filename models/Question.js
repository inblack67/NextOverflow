const { Schema, models, model } = require('mongoose');

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Question title is required'],
        unique: [true, 'Question already exists'],
        trim: true,
        maxlength: [40, 'Question title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: [true, 'Question description is required'],
        trim: true,
    },
    tags: {
        type: String,
        default: 'programming',
        trim: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Who is the creator of this Question?']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

QuestionSchema.pre('remove', async function (next) {
    await this.model('Answer').deleteMany({ question: this._id });
    await this.model('Comment').deleteMany({ question: this._id });
    next();
});

QuestionSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'question',
    justOne: false
});

QuestionSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'question',
    justOne: false
});

module.exports = models.Question || model('Question', QuestionSchema);