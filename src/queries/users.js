import { gql } from '@apollo/client';

export const getUsersQuery = gql`
	query {
		users {
			name
			email
			createdAt
			_id
			image
		}
	}
`;
