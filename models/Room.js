const { Schema, models, model } = require('mongoose');

const RoomSchema = new Schema(
	{
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
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

RoomSchema.virtual('messages', {
	ref: 'Message',
	localField: '_id',
	foreignField: 'room',
	justOne: false,
});

RoomSchema.virtual('users', {
	ref: 'User',
	localField: '_id',
	foreignField: 'room',
	justOne: false,
});

module.exports = (models && models.Room) ?? model('Room', RoomSchema);
