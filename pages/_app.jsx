import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../src/apollo';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		M.AutoInit();
	});

	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}
export default MyApp;
