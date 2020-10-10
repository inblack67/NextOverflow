import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Preloader from '../components/Preloader';
import { connectFB } from '../src/firebase.config';

const ImageUpload = () => {
	const { register, handleSubmit, errors } = useForm();
	const [ submitting, setSubmitting ] = useState(false);

	const firebaseUploadImage = (image) => {
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
				console.log(url);
				console.log('image uploaded');
			},
		);
	};

	return (
		<div className='container'>
			<form
				onSubmit={handleSubmit((formData) => {
					setSubmitting(true);
					const file = formData.file[0];
					firebaseUploadImage(file);
					setSubmitting(false);
				})}
			>
				<div className='file-field input-field'>
					<div className='btn black'>
						<span>Image</span>
						<input type='file' name='file' ref={register({ required: 'Required!' })} required />
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
						Upload
					</button>
				</div>
			</form>
		</div>
	);
};

export default ImageUpload;
