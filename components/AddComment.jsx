import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { addCommentMutation, fetchAllCommentsQuery } from '../src/queries/comments';
import Preloader from './Preloader';
import PropTypes from 'prop-types';

const AddComment = ({ question }) => {
	const [ submitting, setSubmitting ] = useState(false);

	const { register, handleSubmit, errors } = useForm();

	const [ addComment, { loading, data } ] = useMutation(addCommentMutation, {
		refetchQueries: [
			{
				query: fetchAllCommentsQuery,
				variables: {
					question,
				},
			},
		],
	});

	const onSubmit = ({ comment }) => {
		setSubmitting(true);
		console.log(comment);
		addComment({
			variables: {
				question,
				content: comment,
			},
		})
			.then(() => {
				M.toast({ html: 'Comment Posted!' });
			})
			.catch((err) => {
				M.toast({ html: err });
			});

		setSubmitting(false);
	};

	if (loading) {
		return <Preloader />;
	}

	return (
		<div className='container'>
			<p className='flow-text center'>Post Your Comment</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='input-field'>
					<textarea
						name='comment'
						id='comment'
						className='materialize-textarea'
						ref={register({
							required: 'Required!',
						})}
					/>
					<label htmlFor='comment'>Comment</label>
					{errors.comment ? (
						<span className='helper-text red-text'>{errors.comment.message}</span>
					) : (
						<span className='helper-text white-text'>
							Comment <span className='red-text'>(Don't do markdown here.)</span>
						</span>
					)}
				</div>
				<div className='input-field'>
					<button type='submit' className='btn red' disabled={submitting}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

AddComment.propTypes = {
	question: PropTypes.string.isRequired,
};

export default AddComment;
