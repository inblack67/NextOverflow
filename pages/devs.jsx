import { useQuery } from '@apollo/client';
import { Fragment } from 'react';
import Preloader from '../components/Preloader';
import Link from 'next/link';
import DevItem from '../components/DevItem';
import { getUsersQuery } from '../src/queries/users';

const devs = () => {
	const { loading, data } = useQuery(getUsersQuery);

	if (loading) {
		return <Preloader />;
	}

	return (
		<div>
			{data &&
				(data.users ? (
					data.users.map((user) => <DevItem user={user} key={user._id} />)
				) : (
					<Fragment>
						<div className='center'>
							<p className='flow-text'>No Devs Registered Yet.</p>
							<Link href='/register'>
								<a className='btn red pulse'>Register</a>
							</Link>
						</div>
					</Fragment>
				))}
		</div>
	);
};

export default devs;
