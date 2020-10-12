import { gql } from '@apollo/client';

export const fetchMessagesInRoom = gql`
	query($room: ID!) {
		getMessagesInRoom(room: $room) {
			text
			createdAt
      _id
			user {
				name
				_id
			}
		}
	}
`;

export const newRoomMessage = gql`
	mutation($room: ID!, $text: String!, $url: String) {
		newRoomMessage(room: $room, text: $text, url: $url) {
			text
			user {
				name
			}
			room {
				title
			}
		}
	}
`;

export const subscribeToNewMessages = gql`
	subscription($room: ID!) {
		newRoomMessage(room: $room) {
			text
			user {
				name
			}
			room {
				title
			}
		}
	}
`;
