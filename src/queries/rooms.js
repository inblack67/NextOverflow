import { gql } from '@apollo/client';

export const fetchAllRoomsQuery = gql`
	query {
		rooms {
			title
			createdAt
		}
	}
`;

export const addRoomMutation = gql`
	mutation($title: String!, $description: String!) {
		addRoom(title: $title, description: $description) {
			title
			_id
		}
	}
`;

export const deleteRoomMutation = gql`
	mutation($id: ID!) {
		deleteRoom(id: $id) {
			title
		}
	}
`;

export const fetchSingleRoomQuery = gql`
	query($id: ID!) {
		room(id: $id) {
			title
			createdAt
		}
	}
`;

export const updateRoomMutation = gql`
	mutation ($id: ID!, description: String, $title: String){
		updateRoom(id: $id, description: $description, title: $title) {
			title
			createdAt
		}
	}
`;
