import { mutationType, stringArg, idArg, arg } from '@nexus/schema';
import UserModel from '../../models/User';
import AnswerModel from '../../models/Answer';
import QuestionModel from '../../models/Question';
import CommentModel from '../../models/Comment';
import { User } from './User';
import { File } from './File';
import { Question } from './Question';
import { Answer } from './Answer';
import { Comment } from './Comment';
import { serialize } from 'cookie';
import asyncHandler from '../../middlewares/asyncHandler'
import ErrorResponse from '../errorResponse';
import { isProtected } from '../../src/isAuthenticated';
import { GraphQLUpload } from 'graphql-upload';

export const Mutation = mutationType({
    definition(t) {

        t.typeName = 'Mutations';

        t.field('uploadImage', {
            type: 'String',
            nullable: true,
            description: 'Upload Image',
            args: { file: arg({ type: GraphQLUpload }) },
            resolve: asyncHandler(
                async (_, { file }, ctx) => {
                    console.log(file);
                    return 'Uploaded';
                }
            )
        })

        t.field('addComment', {
            type: Comment,
            description: 'Add Comment',
            args: { content: stringArg(), question: idArg() },
            resolve: asyncHandler(
                async (_, { content, question }, ctx) => {
                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }
                    const createdComment = await CommentModel.create({ content, question, user: ctx.req.user._id });
                    const newComment = await CommentModel.findById(createdComment._id).populate(['user']);
                    return newComment;
                }
            )
        })
        t.field('addAnswer', {
            type: Answer,
            description: 'Add Answer',
            args: { content: stringArg(), question: idArg() },
            resolve: asyncHandler(
                async (_, { content, question }, ctx) => {
                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }
                    const createdAnswer = await AnswerModel.create({ content, question, user: ctx.req.user._id });
                    const newAnswer = await AnswerModel.findById(createdAnswer._id).populate(['user', 'question']);
                    return newAnswer;
                }
            )
        })

        t.field('addQuestion', {
            type: Question,
            description: 'Add Question',
            args: { title: stringArg(), description: stringArg(), tags: stringArg({ nullable: true }) },
            resolve: asyncHandler(
                async (_, { title, description, tags }, ctx) => {
                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }
                    const createdQuestion = await QuestionModel.create({ title, description, tags: tags || 'none', user: ctx.req.user._id });
                    const newQuestion = QuestionModel.findById(createdQuestion._id).populate(['user', 'comment']);
                    return newQuestion;
                }
            )
        });

        t.field('updateComment', {
            type: Comment,
            description: 'Update Comment',
            nullable: true,
            args: { id: idArg(), content: stringArg({ nullable: true }) },
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    const comment = await CommentModel.findById(args.id);

                    if (!comment) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    if (comment.user.toString() !== ctx.req.user._id.toString()) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    let body = {};

                    if (args.content) {
                        body.content = args.content;
                    }

                    const updatedComment = await CommentModel.findByIdAndUpdate(args.id, body, { new: true }).populate(['user']);
                    console.log(updatedComment);
                    return updatedComment;
                }
            )
        });
        t.field('updateAnswer', {
            type: Answer,
            description: 'Update Answer',
            nullable: true,
            args: { id: idArg(), content: stringArg({ nullable: true }) },
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    const answer = await AnswerModel.findById(args.id);

                    if (!answer) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    if (answer.user.toString() !== ctx.req.user._id.toString()) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    let body = {};

                    if (args.content) {
                        body.content = args.content;
                    }

                    const updatedAnswer = await AnswerModel.findByIdAndUpdate(args.id, body, { new: true }).populate(['user', 'question']);
                    return updatedAnswer;
                }
            )
        });

        t.field('updateQuestion', {
            type: Question,
            description: 'Update Question',
            nullable: true,
            args: { id: idArg(), title: stringArg({ nullable: true }), description: stringArg({ nullable: true }), tags: stringArg({ nullable: true }) },
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    const question = await QuestionModel.findById(args.id);

                    if (!question) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    if (question.user.toString() !== ctx.req.user._id.toString()) {
                        throw new ErrorResponse('Not Auth!!', 401);
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

                    const updatedQuestion = await QuestionModel.findByIdAndUpdate(args.id, body, { new: true }).populate('user');
                    return updatedQuestion;
                }
            )
        });


        t.field('deleteComment', {
            type: Comment,
            description: 'Delete Comment',
            nullable: true,
            args: { id: idArg() },
            resolve: asyncHandler(
                async (parent, { id }, ctx) => {

                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    const comment = await CommentModel.findById(id);

                    if (!comment) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    if (comment.user.toString() !== ctx.req.user._id.toString()) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    return await CommentModel.findByIdAndDelete(id)
                }
            )
        });
        t.field('deleteAnswer', {
            type: Answer,
            description: 'Delete Answer',
            nullable: true,
            args: { id: idArg() },
            resolve: asyncHandler(
                async (parent, { id }, ctx) => {

                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    const answer = await AnswerModel.findById(id);

                    if (!answer) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    if (answer.user.toString() !== ctx.req.user._id.toString()) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    return await AnswerModel.findByIdAndDelete(id)
                }
            )
        });

        t.field('deleteQuestion', {
            type: Question,
            description: 'Delete Question',
            nullable: true,
            args: { id: idArg() },
            resolve: asyncHandler(
                async (parent, { id }, ctx) => {

                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    const question = await QuestionModel.findById(id);

                    if (!question) {
                        throw new ErrorResponse('Resource not found', 404);
                    }

                    if (question.user.toString() !== ctx.req.user._id.toString()) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }

                    return await QuestionModel.findByIdAndDelete(id)
                }
            )
        });

        t.field('login', {
            type: User,
            description: 'Login',
            args: {
                email: stringArg(),
                password: stringArg(),
            },
            resolve: asyncHandler(
                async (parent, { email, password }, ctx) => {

                    const user = await UserModel.findOne({ email }).select('+password');

                    if (!user) {
                        throw new ErrorResponse('Invalid Credentials', 403);
                    }

                    const isMatch = await user.matchPassword(password);

                    if (!isMatch) {
                        throw new ErrorResponse('Invalid Credentials', 403);
                    }

                    const token = user.getSignedJwtToken();

                    ctx.res.setHeader('Set-Cookie', serialize('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,   // 1 hr
                        path: '/'   // root of out domain, not /api
                    }))

                    return { name: user.name, email: user.email, createdAt: user.createdAt, _id: user._id };
                }
            )
        });

        t.field('logout', {
            type: User,
            description: 'Logout',
            nullable: true,
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const isAuthenticated = await isProtected(ctx);

                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Authorized', 400);
                    }

                    ctx.res.setHeader('Set-Cookie', serialize('token', 'none', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 0,
                        path: '/',
                    }))

                    return null;
                }
            )
        })

        t.field('register', {
            type: User,
            description: 'Register',
            args: {
                name: stringArg(),
                email: stringArg(),
                password: stringArg(),
            },
            resolve: asyncHandler(
                async (parent, { name, email, password }, ctx) => {
                    const user = await UserModel.create({ name, email, password });
                    const token = user.getSignedJwtToken();
                    ctx.res.setHeader('Set-Cookie', serialize('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/'
                    }));

                    return { name: user.name, email: user.email, createdAt: user.createdAt, _id: user._id };
                }
            )
        })
    }
})
