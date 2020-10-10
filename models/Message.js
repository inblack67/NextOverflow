const { Schema, models, model } = require('mongoose');

const MessageSchema = new Schema({
	text: {
		type: String,
		required: [ true, 'Message text is required' ],
		trim: true,
	},
	room: {
		type: Schema.ObjectId,
		ref: 'Room',
		required: [ true, 'Which room does this message belongs to?' ],
	},
	url: {
		type: String,
		trim: true,
		default: 'none',
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: [ true, 'Who is the creator of this Message?' ],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = models.Message || model('Message', MessageSchema);
