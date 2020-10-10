const UserModel = require('./models/User');
const AnswerModel = require('./models/Answer');
const CommentModel = require('./models/Comment');
const QuestionModel = require('./models/Question');
const RoomModel = require('./models/Room');
const MessageModel = require('./models/Message');
const { connectDB } = require('./src/connectDB');
const dotenv = require('dotenv');
require('colors');

dotenv.config({ path: '.env.local' });

connectDB();

const deleteAll = async () => {
	await MessageModel.deleteMany();
	await RoomModel.deleteMany();
	console.log(`Data Deleted`.red.bold.inverse);
	process.exit(0);
};

if (process.argv[2] === '-d') {
	console.log(`Deleting data...`.red.bold);
	deleteAll();
}
