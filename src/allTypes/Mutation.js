import { mutationType, stringArg, idArg, arg } from '@nexus/schema';
import UserModel from '../../models/User';
import AnswerModel from '../../models/Answer';
import QuestionModel from '../../models/Question';
import CommentModel from '../../models/Comment';
import RoomModel from '../../models/Room';
import { User } from './User';
import { Question } from './Question';
import { Answer } from './Answer';
import { Room } from './Room';
import { Message } from './Message';
import MessageModel from '../../models/Message';
import { Comment } from './Comment';
import { serialize } from 'cookie';
import asyncHandler from '../../middlewares/asyncHandler';
import ErrorResponse from '../errorResponse';
import { isProtected } from '../../src/isAuthenticated';
import { GraphQLUpload } from 'graphql-upload';
import { NEW_ROOM_MESSAGE, CHANNEL_NAME } from '../subscriptionTypes';
import { RQUESTIONS } from '../keys';
import { parse, stringify } from 'flatted';

export const Mutation = mutationType({
	definition(t) {
		t.typeName = 'Mutations';

		t.field('newRoomMessage', {
			type: Message,
			args: { room: idArg(), text: stringArg(), url: stringArg({ nullable: true }) },
			resolve: asyncHandler(async (parent, args, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const room = await RoomModel.findById(args.room).populate('user');

				if (!room) {
					throw new ErrorResponse('Resource not found', 404);
				}

				const body = { room: args.room, text: args.text, user: ctx.req.user._id };

				if (args.image) {
					body.image = args.image;
				}

				if (args.file) {
					body.file = args.file;
				}

				if (args.video) {
					body.video = args.video;
				}

				const newMessage = await MessageModel.create(body);

				const message = await MessageModel.findById(newMessage._id).populate([ 'user', 'room' ]);

				ctx.pubsub.publish(NEW_ROOM_MESSAGE, {
					room,
					newRoomMessage: message,
				});

				return message;
			}),
		});

		t.field('deleteMessage', {
			type: Message,
			args: { id: idArg() },
			resolve: asyncHandler(async (parent, { id }, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const message = await MessageModel.findById(id).populate([ 'user', 'room' ]);

				if (message.user._id.toString() !== ctx.req.user._id.toString()) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				const deletedMessage = await MessageModel.findByIdAndDelete(message._id).populate([ 'user', 'room' ]);

				return deletedMessage;
			}),
		});

		t.field('uploadUserImage', {
			type: User,
			nullable: true,
			description: 'Upload Image',
			args: { url: stringArg() },
			resolve: asyncHandler(async (_, { url }, ctx) => {
				const isAuthenticated = await isProtected(ctx);

				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const user = await UserModel.findByIdAndUpdate(
					ctx.req.user._id,
					{ image: url },
					{
						new: true,
					},
				).populate([ 'questions', 'answers', 'comments' ]);

				console.log(user);

				return user;
			}),
		});

		t.field('addComment', {
			type: Comment,
			description: 'Add Comment',
			args: { content: stringArg(), question: idArg() },
			resolve: asyncHandler(async (_, { content, question }, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}
				const createdComment = await CommentModel.create({ content, question, user: ctx.req.user._id });

				const newComment = await CommentModel.findById(createdComment._id).populate([ 'user', 'question' ]);
				return newComment;
			}),
		});
		t.field('addAnswer', {
			type: Answer,
			description: 'Add Answer',
			args: { content: stringArg(), question: idArg() },
			resolve: asyncHandler(async (_, { content, question }, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}
				const createdAnswer = await AnswerModel.create({ content, question, user: ctx.req.user._id });
				const newAnswer = await AnswerModel.findById(createdAnswer._id).populate([ 'user', 'question' ]);
				return newAnswer;
			}),
		});

		t.field('addRoom', {
			type: Room,
			description: 'Add Room',
			args: { title: stringArg(), description: stringArg() },
			resolve: asyncHandler(async (_, { title, description }, ctx) => {
				const newRoom = await RoomModel.create({
					title,
					description,
				});
				const room = await RoomModel.findById(newRoom._id).populate([ 'users', 'messages' ]);
				return room;
			}),
		});

		t.field('addQuestion', {
			type: Question,
			description: 'Add Question',
			args: { title: stringArg(), description: stringArg(), tags: stringArg({ nullable: true }) },
			resolve: asyncHandler(async (_, { title, description, tags }, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}
				const createdQuestion = await QuestionModel.create({
					title,
					description,
					tags: tags || 'none',
					user: ctx.req.user._id,
				});
				const newQuestion = await QuestionModel.findById(createdQuestion._id).populate([ 'user', 'comment' ]);
				ctx.red.lpush(RQUESTIONS, stringify(newQuestion));
				return newQuestion;
			}),
		});

		t.field('updateComment', {
			type: Comment,
			description: 'Update Comment',
			nullable: true,
			args: { id: idArg(), content: stringArg({ nullable: true }) },
			resolve: asyncHandler(async (parent, args, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const comment = await CommentModel.findById(args.id);

				if (!comment) {
					throw new ErrorResponse('Resource not found', 404);
				}

				if (comment.user.toString() !== ctx.req.user._id.toString()) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				let body = {};

				if (args.content) {
					body.content = args.content;
				}

				const updatedComment = await CommentModel.findByIdAndUpdate(args.id, body, { new: true }).populate([
					'user',
				]);
				console.log(updatedComment);
				return updatedComment;
			}),
		});
		t.field('updateAnswer', {
			type: Answer,
			description: 'Update Answer',
			nullable: true,
			args: { id: idArg(), content: stringArg({ nullable: true }) },
			resolve: asyncHandler(async (parent, args, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const answer = await AnswerModel.findById(args.id);

				if (!answer) {
					throw new ErrorResponse('Resource not found', 404);
				}

				if (answer.user.toString() !== ctx.req.user._id.toString()) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				let body = {};

				if (args.content) {
					body.content = args.content;
				}

				const updatedAnswer = await AnswerModel.findByIdAndUpdate(args.id, body, { new: true }).populate([
					'user',
					'question',
				]);
				return updatedAnswer;
			}),
		});

		t.field('updateRoom', {
			type: Room,
			description: 'Update Room',
			nullable: true,
			args: {
				id: idArg(),
				title: stringArg({ nullable: true }),
				description: stringArg({ nullable: true }),
			},
			resolve: asyncHandler(async (parent, args, ctx) => {
				const room = await RoomModel.findById(args.id).populate([ 'users', 'messages' ]);

				if (!room) {
					throw new ErrorResponse('Resource not found', 404);
				}

				let body = {};

				if (args.title) {
					body.title = args.title;
				}

				if (args.description) {
					body.description = args.description;
				}

				const updatedRoom = await RoomModel.findByIdAndUpdate(args.id, body, { new: true }).populate([
					'users',
					'messages',
				]);
				return updatedRoom;
			}),
		});

		t.field('updateQuestion', {
			type: Question,
			description: 'Update Question',
			nullable: true,
			args: {
				id: idArg(),
				title: stringArg({ nullable: true }),
				description: stringArg({ nullable: true }),
				tags: stringArg({ nullable: true }),
			},
			resolve: asyncHandler(async (parent, args, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const question = await QuestionModel.findById(args.id);

				if (!question) {
					throw new ErrorResponse('Resource not found', 404);
				}

				if (question.user.toString() !== ctx.req.user._id.toString()) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				let body = {};

				if (args.title) {
					body.title = args.title;
				}

				if (args.description) {
					body.description = args.description;
				}

				if (args.tags) {
					body.tags = args.tags;
				}

				const updatedQuestion = await QuestionModel.findByIdAndUpdate(args.id, body, { new: true }).populate(
					'user',
				);
				return updatedQuestion;
			}),
		});

		t.field('deleteComment', {
			type: Comment,
			description: 'Delete Comment',
			nullable: true,
			args: { id: idArg() },
			resolve: asyncHandler(async (parent, { id }, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const comment = await CommentModel.findById(id);

				if (!comment) {
					throw new ErrorResponse('Resource not found', 404);
				}

				if (comment.user.toString() !== ctx.req.user._id.toString()) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				return await CommentModel.findByIdAndDelete(id);
			}),
		});
		t.field('deleteAnswer', {
			type: Answer,
			description: 'Delete Answer',
			nullable: true,
			args: { id: idArg() },
			resolve: asyncHandler(async (parent, { id }, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const answer = await AnswerModel.findById(id);

				if (!answer) {
					throw new ErrorResponse('Resource not found', 404);
				}

				if (answer.user.toString() !== ctx.req.user._id.toString()) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				return await AnswerModel.findByIdAndDelete(id);
			}),
		});

		t.field('deleteRoom', {
			type: Room,
			description: 'Delete Room',
			nullable: true,
			args: { id: idArg() },
			resolve: asyncHandler(async (parent, { id }, ctx) => {
				const room = await RoomModel.findById(id).populate([ 'users', 'messages' ]);

				return await RoomModel.findByIdAndDelete(id);
			}),
		});
		t.field('deleteQuestion', {
			type: Question,
			description: 'Delete Question',
			nullable: true,
			args: { id: idArg() },
			resolve: asyncHandler(async (parent, { id }, ctx) => {
				const isAuthenticated = await isProtected(ctx);
				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 401);
				}

				const question = await QuestionModel.findById(id);

				if (!question) {
					throw new ErrorResponse('Resource not found', 404);
				}

				if (question.user.toString() !== ctx.req.user._id.toString()) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				return await QuestionModel.findByIdAndDelete(id);
			}),
		});

		t.field('login', {
			type: User,
			description: 'Login',
			args: {
				email: stringArg(),
				password: stringArg(),
			},
			resolve: asyncHandler(async (parent, { email, password }, ctx) => {
				const isAuthenticated = await isProtected(ctx);

				if (isAuthenticated) {
					throw new ErrorResponse('Not Authorized', 400);
				}

				const user = await UserModel.findOne({ email }).select('+password');

				if (!user) {
					throw new ErrorResponse('Invalid Credentials', 403);
				}

				const isMatch = await user.matchPassword(password);

				if (!isMatch) {
					throw new ErrorResponse('Invalid Credentials', 403);
				}

				const token = user.getSignedJwtToken();

				ctx.res.setHeader(
					'Set-Cookie',
					serialize('token', token, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						sameSite: 'strict',
						maxAge: 3600, // 1 hr
						path: '/', // root of out domain, not /api
					}),
				);

				return { name: user.name, email: user.email, createdAt: user.createdAt, _id: user._id };
			}),
		});

		t.field('logout', {
			type: User,
			description: 'Logout',
			nullable: true,
			resolve: asyncHandler(async (parent, args, ctx) => {
				const isAuthenticated = await isProtected(ctx);

				if (!isAuthenticated) {
					throw new ErrorResponse('Not Authenticated', 400);
				}

				ctx.res.setHeader(
					'Set-Cookie',
					serialize('token', 'none', {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						sameSite: 'strict',
						maxAge: 0,
						path: '/',
					}),
				);

				return null;
			}),
		});

		t.field('register', {
			type: User,
			description: 'Register',
			args: {
				name: stringArg(),
				email: stringArg(),
				password: stringArg(),
				image: stringArg(),
			},
			resolve: asyncHandler(async (parent, { name, email, password, image }, ctx) => {
				const isAuthenticated = await isProtected(ctx);

				if (isAuthenticated) {
					throw new ErrorResponse('Not Authorized', 400);
				}

				const user = await UserModel.create({ name, email, password, image });
				const token = user.getSignedJwtToken();
				ctx.res.setHeader(
					'Set-Cookie',
					serialize('token', token, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						sameSite: 'strict',
						maxAge: 3600,
						path: '/',
					}),
				);

				return {
					name: user.name,
					email: user.email,
					createdAt: user.createdAt,
					_id: user._id,
					image: user.image,
				};
			}),
		});
	},
});
