import PropTypes from 'prop-types';
import { RenderMarkdown } from 'use-syntaxer';

const CommentItem = ({ comment: { content, user: { name } } }) => {
	return (
		<div className='container'>
			<div className='card grey darken-4'>
				<div className='card-content'>
					<div className='card-title red-text'>{name}</div>
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
