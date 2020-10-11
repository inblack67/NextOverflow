import { gql } from '@apollo/client';

export const getUsersQuery = gql`
	query {
		users {
			name
			createdAt
			_id
			image
		}
	}
`;

export const fetchSingleUserQuery = gql`
	query($id: ID!) {
		user(id: $id) {
			name
			createdAt
			_id
			image
			questions {
				title
				description
				_id
				createdAt
			}
			answers {
				content
				_id
				createdAt
			}
			comments {
				content
				_id
				createdAt
			}
		}
	}
`;
