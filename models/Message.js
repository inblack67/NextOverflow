const { Schema, models, model } = require('mongoose');

const MessageSchema = new Schema({
	text: {
		type: String,
		required: [ true, 'Message text is required' ],
		trim: true,
	},
	room: {
		type: String,
		required: [ true, 'Message Room is required' ],
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
	time: {
		type: String,
		required: [ true, 'Message time is required' ],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = models.Message || model('Message', MessageSchema);
