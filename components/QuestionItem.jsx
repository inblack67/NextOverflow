import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import { deleteQuestionMutation, fetchAllQuestionsQuery } from '../src/queries/questions';
import Preloader from './Preloader';
import FormatDate from './FormatDate';

const QuestionItem = ({ question: { title, createdAt, tags, description, _id, user: { name }, user }, currentUser }) => {

	const [ deleteQuestion, mutationResponse ] = useMutation(deleteQuestionMutation, {
		variables: {
			id: _id,
		},
		refetchQueries: [
			{
				query: fetchAllQuestionsQuery,
			},
		],
	});

	if (mutationResponse.loading) {
		return <Preloader />;
	}

	const onDelete = (e) => {
		deleteQuestion()
			.then(() => {
				M.toast({ html: 'Question Deleted!' });
			})
			.catch((err) => {
				M.toast({ html: err });
			});
	};

	return (
		<div className='col s12 m6 l6'>
			<div className='card grey darken-3'>
				<div className='card-content'>
					<span className='card-title'>{title}</span>
					<p>
						~ <span className='grey-text'>{name}</span>
					</p>
					<p className='blue-text'>
						<FormatDate createdAt={createdAt} />
					</p>
				</div>
				<div className='card-action'>
					<Link href='/question/[id]' as={`/question/${_id}`}>
						<a>Explore</a>
					</Link>
					{currentUser._id === user._id ? (
						<a href='#!' className='secondary-content' onClick={onDelete}>
							Delete
						</a>
					) : null}
				</div>
			</div>
		</div>
	);
};

QuestionItem.propTypes = {
	question: PropTypes.object.isRequired,
};

export default QuestionItem;
