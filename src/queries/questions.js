import { gql } from '@apollo/client';

export const fetchAllQuestionsQuery = gql`
	query {
		questions {
			title
			description
			tags
			_id
			user {
				name
				_id
			}
			createdAt
		}
	}
`;

export const addQuestionMutation = gql`
	mutation($title: String!, $description: String!, $tags: String) {
		addQuestion(title: $title, description: $description, tags: $tags) {
			title
			_id
		}
	}
`;

export const deleteQuestionMutation = gql`
	mutation($id: ID!) {
		deleteQuestion(id: $id) {
			title
		}
	}
`;

export const fetchSingleQuestionQuery = gql`
	query($id: ID) {
		question(id: $id) {
			title
			description
			tags
			user {
				name
			}
			createdAt
		}
	}
`;
