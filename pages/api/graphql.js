import { ApolloServer } from 'apollo-server-micro';
import { PubSub } from 'graphql-subscriptions';
import { schema } from '../../src/schema';
import nextConnect from 'next-connect';
import errorHandler from '../../middlewares/errorHandler';
import { connectDB } from '../../src/connectDB';
import morgan from 'morgan';
import cors from 'cors';

connectDB();

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
	schema,
	context: async ({ req, res }) => ({ req, res, pubsub }),

	subscriptions: {
		path: '/api/graphql',
		keepAlive: 9000,
		onConnect: console.log('Subscriptions are here'.blue.bold),
		onDisconnect: () => console.log('Subscriptions disconnected'.red.bold),
	},
	playground: {
		subscriptionEndpoint: '/api/graphql',
		settings: {
			'request.credentials': 'same-origin',
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
