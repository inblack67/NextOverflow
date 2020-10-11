import PropTypes from 'prop-types';
import FormatDate from './FormatDate';

const CommentItem = ({ comment: { createdAt, content, user: { name } } }) => {
	return (
		<div className='container'>
			<div className='card grey darken-4'>
				<div className='card-content'>
					<div className='card-title red-text'>{name}</div>
					<p className='blue-text'>
						<FormatDate createdAt={createdAt} />
					</p>
					<br/>
					<p>{content}</p>
				</div>
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default CommentItem;
