import { gql } from '@apollo/client';

export const fetchAllCommentsQuery = gql`
	query($question: ID!) {
		questionComments(question: $question) {
			content
			_id
			user {
				name
				_id
			}
			createdAt
		}
	}
`;

export const addCommentMutation = gql`
	mutation($content: String!, $question: ID!) {
		addComment(content: $content, question: $question) {
			content
			_id
			user {
				name
			}
		}
	}
`;

export const deleteCommentMutation = gql`
	mutation($id: ID!) {
		deleteComment(id: $id) {
			content
			_id
			user {
				name
			}
		}
	}
`;

export const fetchSingleCommentQuery = gql`
	query($id: ID) {
		comment(id: $id) {
			content
			_id
			user {
				name
				_id
			}
			createdAt
		}
	}
`;
