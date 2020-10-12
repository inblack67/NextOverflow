import { useQuery } from '@apollo/client';
import { Fragment } from 'react';
import Preloader from '../components/Preloader';
import Link from 'next/link';
import DevItem from '../components/DevItem';
import { getUsersQuery } from '../src/queries/users';
import IsAuthenticated from '../components/IsAuthenticated';

const devs = () => {
	const { loading, data } = useQuery(getUsersQuery);

	if (loading) {
		return <Preloader />;
	}

	return (
		<Fragment>
			<IsAuthenticated />
			<div className='container'>
				<p className='flow-text center red-text'>Devs</p>
				<div className='row'>
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
			</div>
		</Fragment>
	);
};

export default devs;
