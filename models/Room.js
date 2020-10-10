const { Schema, models, model } = require('mongoose');

const RoomSchema = new Schema({
	title: {
		type: String,
		required: [ true, 'Room title is required' ],
		unique: [ true, 'Room already exists' ],
	},
	description: {
		type: String,
		required: [ true, 'Room description is required' ],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = models.Room || model('Room', RoomSchema);
