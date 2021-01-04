import { ApolloServer } from 'apollo-server-micro';
import { PubSub } from 'graphql-subscriptions';
import { schema } from '../../src/schema';
import nextConnect from 'next-connect';
import errorHandler from '../../middlewares/errorHandler';
import { connectDB } from '../../src/connectDB';
import cors from 'cors';
import { isAuthWithToken } from '../../src/isAuthenticated';
import cookies from 'cookie';
import ErrorResponse from '../../src/errorResponse';
// import redis from 'ioredis';
import QuestionModel from '../../models/Question';
import { RQUESTIONS } from '../../src/keys';
import { parse, stringify } from 'flatted';

connectDB();

const pubsub = new PubSub();
// const red = new redis();

// const fillRedis = async () => {
// 	await red.del(RQUESTIONS);
// 	const questions = await QuestionModel.find().populate([ 'user', 'comments', 'answers' ]);
// 	if (questions.length >= 1) {
// 		const questionsStrings = questions.map((qn) => stringify(qn));
// 		red.lpush(RQUESTIONS, ...questionsStrings);
// 	}
// };

// fillRedis().catch((err) => err);

const apolloServer = new ApolloServer({
	schema,
	context: async ({ req, res }) => ({ req, res, pubsub, red }),

	subscriptions: {
		path: '/api/subscriptions',
		keepAlive: 9000,
		onConnect: async (connectionParams, ws, ctx) => {
			console.log('Subscriptions are here'.blue.bold);
			let token;
			const cookie = ctx.request.headers.cookie;
			if (cookie) {
				token = cookies.parse(cookie).token;
			}
			if (!token) {
				throw new ErrorResponse('Not Authenticated', 401);
			}
			const isAuth = await isAuthWithToken(token);
			if (!isAuth) {
				if (!token) {
					throw new ErrorResponse('Not Authenticated', 401);
				}
			}
		},
		onDisconnect: () => console.log('Subscriptions disconnected'.red.bold),
	},
	playground: {
		subscriptionEndpoint: '/api/subscriptions',
		settings: {
			'request.credentials': 'include',
		},
	},
});

const graphqlWithSubscriptionHandler = (req, res, next) => {
	if (!res.socket.server.apolloServer) {
		console.log(`Apollo server is here`.green.bold);
		apolloServer.installSubscriptionHandlers(res.socket.server);
		const handler = apolloServer.createHandler({ path: '/api/graphql' });
		res.socket.server.apolloServer = handler;
	}

	return res.socket.server.apolloServer(req, res, next);
};

const nextConnectHandler = nextConnect({ onError: errorHandler })
	.use(cors())
	.use('/api/graphql', graphqlWithSubscriptionHandler);

export const config = {
	api: {
		bodyParser: false,
	},
};

export default nextConnectHandler;
