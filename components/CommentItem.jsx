import PropTypes from 'prop-types';
import { Fragment } from 'react';
import FormatDate from './FormatDate';

const CommentItem = ({ comment: { createdAt, content, _id, user: { name }, user } }) => {
	const onDelete = (e) => {};

	return (
		<div className='container'>
			<div className='card grey darken-4'>
				<div className='card-content'>
					<div className='card-title red-text'>{name}</div>
					<p className='blue-text'>
						<FormatDate createdAt={createdAt} />
					</p>
					<br />
					<p>{content}</p>
				</div>
				<div className='card-action'>
					{user._id === _id && (
						<Fragment>
							<a href='#!' onClick={onDelete} className='red-text'>
								Delete
							</a>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default CommentItem;
