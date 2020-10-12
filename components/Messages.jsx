import { useQuery, useSubscription } from '@apollo/client';
import { fetchMessagesInRoom, subscribeToNewMessages } from '../src/queries/message';
import PropTypes from 'prop-types';
import Preloader from './Preloader';
import MessagetItem from './MessageItem';
import PostMessage from './PostMessage';
import { useEffect } from 'react';

const Messages = ({ room }) => {
	const { loading, data, subscribeToMore } = useQuery(fetchMessagesInRoom, {
		variables: {
			room,
		},
	});

	const subRes = useSubscription(subscribeToNewMessages, {
		variables: {
			room,
		},
	});

	useEffect(
		() => {
			subscribeToMore({
				document: subscribeToNewMessages,
				variables: {
					room,
				},
				updateQuery: (prev, res) => {
					if (!res.subscriptionData.data) {
						return prev;
					}
					return {
						...prev,
						getMessagesInRoom: res.subscriptionData.data.newRoomMessage,
					};
				},
			});
		},
		[ subRes.loading ],
	);

	if (loading) {
		return <Preloader />;
	}

	return (
		<div>
			<PostMessage room={room} />
			<p className='flow-text center red-text'>Messages</p>
			<ul className='collection'>
				{data &&
					data.getMessagesInRoom &&
					data.getMessagesInRoom.map((message) => <MessagetItem key={message._id} message={message} />)}
			</ul>
		</div>
	);
};

Messages.propTypes = {
	room: PropTypes.string.isRequired,
};

export default Messages;
