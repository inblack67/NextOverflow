import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { addQuestionMutation, fetchAllQuestionsQuery } from '../src/queries/questions';
import { getMeQuery } from '../src/queries/auth';
import Router from 'next/router';
import Preloader from '../components/Preloader';
import { initializeApollo } from '../src/apollo';
import { isProtected } from '../src/isAuthenticated';
import IsAuthenticated from '../components/IsAuthenticated';

const AskQuestion = () => {
	const [ submitting, setSubmitting ] = useState(false);

	const { register, handleSubmit, errors } = useForm();

	const [ askQuestion, { loading, data } ] = useMutation(addQuestionMutation, {
		refetchQueries: [
			{
				query: fetchAllQuestionsQuery,
			},
		],
	});

	const onAsk = ({ title, description, tags }) => {
		setSubmitting(true);

		askQuestion({
			variables: {
				title,
				description,
				tags,
			},
		})
			.then(() => {
				M.toast({ html: 'Question Asked!' });
				Router.push('/');
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
		<Fragment>
			<IsAuthenticated />
			<div className='container'>
				<p className='flow-text center'>Ask</p>
				<form onSubmit={handleSubmit(onAsk)}>
					<div className='input-field'>
						<input
							type='text'
							name='title'
							ref={register({
								required: 'Required!',
							})}
						/>
						<label htmlFor='title' />
						{errors.title ? (
							<span className='helper-text red-text'>{errors.title.message}</span>
						) : (
							<span className='helper-text white-text'>Title</span>
						)}
					</div>
					<div className='input-field'>
						<input
							type='text'
							name='tags'
							ref={register({
								required: 'Required!',
							})}
						/>
						<label htmlFor='tags' />
						{errors.tags ? (
							<span className='helper-text red-text'>{errors.tags.message}</span>
						) : (
							<span className='helper-text white-text'>
								Tags <span className='red-text'>(Next.js, GraphQL, MERN)</span>{' '}
							</span>
						)}
					</div>
					<div className='input-field'>
						<textarea
							name='description'
							id='description'
							className='materialize-textarea'
							ref={register({
								required: 'Required!',
							})}
						/>
						<label htmlFor='description' />
						{errors.description ? (
							<span className='helper-text red-text'>{errors.description.message}</span>
						) : (
							<span className='helper-text white-text'>
								Description{' '}
								<span className='red-text'>(Don't think, show off your markdown skills.)</span>
							</span>
						)}
					</div>
					<div className='input-field'>
						<button type='submit' className='btn red' disabled={submitting}>
							Ask
						</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default AskQuestion;
