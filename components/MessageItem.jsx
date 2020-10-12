import PropTypes from 'prop-types';
import FormatDate from './FormatDate';
import Link from 'next/link';

const MessageItem = ({ message: { text, createdAt, user } }) => {
	return (
		<li className='collection-item black'>
			<div>
				<span>{text}</span>
				<span className='secondary-content blue-text'>
					<FormatDate createdAt={createdAt} />
				</span>
			</div>
			<div>
				<p>
					<Link href='/dev/[id]' as={`/dev/${user._id}`}>
						<a>
							~ <span className='red-text'> {user.name}</span>
						</a>
					</Link>
				</p>
			</div>
		</li>
	);
};

MessageItem.propTypes = {
	message: PropTypes.object.isRequired,
};

export default MessageItem;
