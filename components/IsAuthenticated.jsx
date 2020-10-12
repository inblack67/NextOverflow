import { useQuery } from '@apollo/client';
import { getMeQuery } from '../src/queries/auth';
import Preloader from './Preloader';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const IsAuthenticated = () => {
	const { loading, data } = useQuery(getMeQuery);
	const router = useRouter();
	if (loading) {
		return <Preloader />;
	}
	if (!data) {
		router.replace('/login');
	}
	return <Fragment />;
};

export default IsAuthenticated;
