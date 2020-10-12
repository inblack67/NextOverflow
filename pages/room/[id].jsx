import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { fetchSingleRoomQuery } from '../../src/queries/rooms';
import Preloader from '../../components/Preloader';
import FormatDate from '../../components/FormatDate';
import { Fragment } from 'react';
import IsAuthenticated from '../../components/IsAuthenticated';
import Link from 'next/link';
import Messages from '../../components/Messages';

const SingleDev = () => {
	const router = useRouter();
	const { query: { id } } = router;

	const { loading, data } = useQuery(fetchSingleRoomQuery, {
		variables: {
			id,
		},
	});

	if (loading) {
		return <Preloader />;
	}

	const { room: { messages, _id, title, description, createdAt } } = data;

	return (
		<Fragment>
			<IsAuthenticated />
			<div className='container'>
				{data &&
				data.room && (
					<Fragment>
						<div className='card grey darken-4 small'>
							<div className='card-content'>
								<span className='card-title red-text'>{title}</span>
								<p>{description}</p>
								<p>
									Created On:{' '}
									<span className='blue-text'>
										<FormatDate createdAt={createdAt} />
									</span>
								</p>
							</div>
						</div>
						<Messages room={id} />
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default SingleDev;
