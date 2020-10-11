import { gql } from '@apollo/client';

export const fetchAllAnswersQuery = gql`
	query($question: ID!) {
		questionAnswers(question: $question) {
			content
			_id
			user {
				name
			}
			createdAt
		}
	}
`;

export const addAnswerMutation = gql`
	mutation($content: String!, $question: ID!) {
		addAnswer(content: $content, question: $question) {
			content
			_id
			user {
				name
			}
		}
	}
`;

export const deleteAnswerMutation = gql`
	mutation($id: ID!) {
		deleteAnswer(id: $id) {
			content
			_id
			user {
				name
			}
		}
	}
`;

export const fetchSingleAnswerQuery = gql`
	query($id: ID) {
		answer(id: $id) {
			content
			_id
			user {
				name
			}
			createdAt
		}
	}
`;
