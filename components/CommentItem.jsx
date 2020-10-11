import PropTypes from 'prop-types';
import { RenderMarkdown } from 'use-syntaxer';
import Moment from 'react-moment';

const CommentItem = ({ comment: { createdAt, content, user: { name } } }) => {
	return (
		<div className='container'>
			<div className='card grey darken-4'>
				<div className='card-content'>
					<div className='card-title red-text'>{name}</div>
					<p className='blue-text'>
						<Moment format='MMMM Do YYYY' date={new Date(parseInt(createdAt, 10))} />
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
