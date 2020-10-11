import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { addAnswerMutation, fetchAllAnswersQuery } from '../src/queries/answers';
import Router from 'next/router';
import Preloader from './Preloader';
import PropTypes from 'prop-types';

const AddAnswer = ({ question }) => {
	const [ submitting, setSubmitting ] = useState(false);

	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			answer: 'Why Not?',
		},
	});

	const [ addAnswer, { loading, data } ] = useMutation(addAnswerMutation, {
		refetchQueries: [
			{
				query: fetchAllAnswersQuery,
				variables: {
					question,
				},
			},
		],
	});

	const onSubmit = ({ answer }) => {
		setSubmitting(true);
		addAnswer({
			variables: {
				question,
				content: answer,
			},
		})
			.then(() => {
				M.toast({ html: 'Question Answered!' });
				// Router.push('/');
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
			<p className='flow-text center'>Add Your Answer</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='input-field'>
					<textarea
						name='answer'
						id='answer'
						className='materialize-textarea'
						ref={register({
							required: 'Required!',
						})}
					/>
					<label htmlFor='answer'>Answer</label>
					{errors.answer ? (
						<span className='helper-text red-text'>{errors.answer.message}</span>
					) : (
						<span className='helper-text white-text'>
							Answer <span className='red-text'>(Don't think, show off your markdown skills.)</span>
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

AddAnswer.propTypes = {
	question: PropTypes.string.isRequired,
};

export default AddAnswer;
