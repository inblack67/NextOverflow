import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { newRoomMessage, fetchMessagesInRoom } from '../src/queries/message';
import PropTypes from 'prop-types';
import Preloader from './Preloader';

const PostMessage = ({ room }) => {
	const { handleSubmit, errors, register } = useForm({
		defaultValues: {
			text: 'hah',
		},
	});

	const [ postMessage, { loading, data } ] = useMutation(newRoomMessage);

	const onPost = ({ text }) => {
		postMessage({
			variables: {
				text,
				room,
			},
		})
			.then(() => M.toast({ html: 'Message Posted!' }))
			.catch((err) => console.error(err));
	};

	if (loading) {
		return <Preloader />;
	}

	return (
		<div className='container'>
			<form onSubmit={handleSubmit(onPost)}>
				<div className='input-field'>
					<input
						type='text'
						name='text'
						ref={register({
							required: 'Required',
						})}
					/>
					{errors.text ? (
						<span className='helper-text red-text'>{errors.text.message}</span>
					) : (
						<span className='helper-text white-text'>Message</span>
					)}
				</div>
				<div className='input-field'>
					<button type='submit' className='btn red'>
						Post
					</button>
				</div>
			</form>
		</div>
	);
};

PostMessage.propTypes = {
	room: PropTypes.string.isRequired,
};

export default PostMessage;
