import { queryType, idArg } from '@nexus/schema';
import QuestionModel from '../../models/Question';
import { isProtected } from '../isAuthenticated';
import ErrorResponse from '../errorResponse';
import { User } from './User';
import asyncHandler from '../../middlewares/asyncHandler';
import { Question } from './Question';
import { Answer } from './Answer';
import { Comment } from './Comment';
import UserModel from '../../models/User';
import AnswerModel from '../../models/Answer';
import CommentModel from '../../models/Comment';

export const Query = queryType({
    definition(t) {

        t.list.field('questionComments', {
            type: Comment,
            description: 'Get All Comments Of A Question',
            args: {
                question: idArg()
            },
            resolve: asyncHandler(
                async (_, { question }) => {
                    const comments = await CommentModel.find({ question }).populate(['user']);
                    return comments;
                }
            )
        })

        t.list.field('questionAnswers', {
            type: Answer,
            description: 'Get All Answers Of A Question',
            args: {
                question: idArg()
            },
            resolve: asyncHandler(
                async (_, { question }) => {
                    const answers = await AnswerModel.find({ question }).populate(['user', 'question']);
                    return answers;
                }
            )
        })

        t.field('answer', {
            type: Answer,
            description: 'Get Single Answer',
            args: {
                id: idArg()
            },
            resolve: asyncHandler(
                async (_, { id }) => {
                    const answer = await AnswerModel.findById(id).populate(['user', 'question']);
                    return answer;
                }
            )
        })

        t.field('comment', {
            type: Comment,
            description: 'Get Single Comment',
            args: {
                id: idArg()
            },
            resolve: asyncHandler(
                async (_, { id }) => {
                    const comment = await CommentModel.findById(id).populate(['user']);
                    return comment;
                }
            )
        })

        t.field('question', {
            type: Question,
            description: 'Get Single Question',
            args: {
                id: idArg()
            },
            resolve: asyncHandler(
                async (_, { id }) => {
                    const question = await QuestionModel.findById(id).populate(['user', 'comments', 'answers']);
                    return question;
                }
            )
        })

        t.list.field('questions', {
            type: Question,
            description: 'Get All Questions',
            resolve: asyncHandler(
                async () => {
                    const questions = await QuestionModel.find().populate(['user', 'comments', 'answers']);
                    return questions;
                }
            )
        })

        t.field('getMe', {
            type: User,
            description: 'Get Logged In User',
            resolve: asyncHandler(
                async (parent, args, ctx) => {
                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!', 401);
                    }
                    return ctx.req.user;
                }
            )
        });

        t.list.field('users', {
            type: User,
            description: 'GET All Users',
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const isAuthenticated = await isProtected(ctx);

                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth', 401);
                    }

                    const users = await UserModel.find().populate(['questions', 'answers']);
                    return users;
                }
            )
        })
    }
})