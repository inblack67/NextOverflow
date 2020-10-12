import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { registerMutation } from '../src/queries/auth';
import Preloader from '../components/Preloader';
import { connectFB } from '../src/firebase.config';

const Register = () => {
	const [ submitting, setSubmitting ] = useState(false);

	const [ imageUrl, setImageUrl ] = useState(null);

	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			name: 'aman',
			email: 'aman@gmail.com',
			password: 'Aman123@',
		},
	});

	const [ registerUser, { data, loading } ] = useMutation(registerMutation);

	const onRegister = ({ name, email, password, file }) => {
		setSubmitting(true);
		const image = file[0];
		const firebase = connectFB();
		const storage = firebase.storage();
		const store = firebase.firestore();
		const dbRef = storage.ref(image.name);
		const collectionRef = store.collection('uploads');
		dbRef.put(image).on(
			'state_changed',
			(snap) => {
				// progress
			},
			(err) => {
				console.error(err);
				return;
			},
			async () => {
				const url = await dbRef.getDownloadURL();
				collectionRef.add({ image: url, createdAt: Date.now() });
				console.log(`Image uploaded`);
				registerUser({
					variables: {
						name,
						email,
						password,
						image: url,
					},
				})
					.then(() => {
						localStorage.setItem('isAuthenticated', true);
						M.toast({ html: 'Registered!' });
						Router.push('/');
					})
					.catch((err) => {
						M.toast({ html: err });
					});
			},
		);
		setSubmitting(false);
	};

	if (loading) {
		return <Preloader />;
	}

	return (
		<Fragment>
			<div className='container'>
				<p className='flow-text center'>Register</p>
				<form onSubmit={handleSubmit(onRegister)}>
					<div className='input-field'>
						<input
							type='text'
							name='name'
							ref={register({
								required: 'Required!',
							})}
						/>
						<label htmlFor='name' />
						{errors.name ? (
							<span className='helper-text red-text'>{errors.name.message}</span>
						) : (
							<span className='helper-text white-text'>Name</span>
						)}
					</div>
					<div className='input-field'>
						<input
							type='email'
							name='email'
							ref={register({
								required: 'Required!',
							})}
						/>
						<label htmlFor='email' />
						{errors.email ? (
							<span className='helper-text red-text'>{errors.email.message}</span>
						) : (
							<span className='helper-text white-text'>Email</span>
						)}
					</div>
					<div className='input-field'>
						<input
							type='password'
							name='password'
							ref={register({
								required: 'Required!',
								minLength: {
									value: 8,
									message: 'Must be 8 chars',
								},
								maxLength: {
									value: 16,
									message: 'Cannot exceed 16 chars',
								},
								validate: (value) => {
									return (
										[ /[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/ ].every((pattern) =>
											pattern.test(value),
										) || 'Must include lower, upper, number, and special chars'
									);
								},
							})}
						/>
						<label htmlFor='password' />
						{errors.password ? (
							<span className='helper-text red-text'>{errors.password.message}</span>
						) : (
							<span className='helper-text white-text'>Password</span>
						)}
					</div>
					<div className='file-field input-field'>
						<div className='btn grey darken-2'>
							<span>Image</span>
							<input type='file' name='file' ref={register({ required: 'Required!' })} />
						</div>
						<div className='file-path-wrapper'>
							<input className='file-path validate' type='text' />
							{errors.file ? (
								<span className='red-text helper-text'> {errors.file.message} </span>
							) : (
								<span className='helper-text'>Add Image</span>
							)}
						</div>
					</div>
					<div className='input-field'>
						<button type='submit' className='btn red' disabled={submitting}>
							Register
						</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default Register;
