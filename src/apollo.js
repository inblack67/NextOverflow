import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import Router from 'next/router';

let apolloClient;

function createIsomorphLink() {
	if (typeof window === 'undefined') {
		const { SchemaLink } = require('@apollo/client/link/schema');
		const { schema } = require('./schema');
		return new SchemaLink({ schema });
	} else {
		const { HttpLink } = require('@apollo/client/link/http');
		const { WebSocketLink } = require('@apollo/client/link/ws');

		const httpLink = new HttpLink({
			uri: `https://${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
			credentials: 'same-origin',
		});
		const wsLink = new WebSocketLink({
			uri: `wss://${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions`,
			options: {
				reconnect: true,
			},
		});
		const splitLink = split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
			},
			wsLink,
			httpLink,
		);
		return splitLink;
	}
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) => {
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
			if (message === 'Not Authenticated') {
				M.toast({ html: 'You must login first!' });
				Router.replace('/login');
			}
		});
	}

	if (networkError) {
		console.log(`[Network error]: ${networkError}`);
	}
});

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: errorLink.concat(createIsomorphLink()),
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		_apolloClient.cache.restore(initialState);
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function useApollo(initialState) {
	const store = useMemo(() => initializeApollo(initialState), [ initialState ]);
	return store;
}
