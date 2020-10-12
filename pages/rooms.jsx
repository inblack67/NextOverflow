import { useQuery } from '@apollo/client';
import { Fragment } from 'react';
import Preloader from '../components/Preloader';
import Link from 'next/link';
import DevItem from '../components/DevItem';
import { fetchAllRoomsQuery } from '../src/queries/rooms';
import IsAuthenticated from '../components/IsAuthenticated';
import RoomItem from '../components/RoomItem';

const Rooms = () => {
	const { loading, data } = useQuery(fetchAllRoomsQuery);

	if (loading) {
		return <Preloader />;
	}

	const {rooms} = data;

	return (
		<Fragment>
			<IsAuthenticated />
			<div className='container'>
				<p className='flow-text center red-text'>Devs</p>
				<div className='row'>
					{data &&
						(data.rooms ? (
							data.rooms.map((room) => <RoomItem room={room} key={room._id} />)
						) : (
							<Fragment>
								<div className='center'>
									<p className='flow-text'>No Rooms Yet.</p>
									<Link href='/'>
										<a className='btn red pulse'>Back Home</a>
									</Link>
								</div>
							</Fragment>
						))}
				</div>
			</div>
		</Fragment>
	);
};

export default Rooms;
