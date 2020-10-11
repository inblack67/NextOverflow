import PropTypes from 'prop-types';
import { RenderMarkdown } from 'use-syntaxer';
import Moment from 'react-moment';

const AnswerItem = ({ answer: { content, createdAt, user: { name } } }) => {
	return (
		<div className='col s12 m6 l6'>
			<div className='card grey darken-4'>
				<div className='card-content'>
					<RenderMarkdown code={content} />
				</div>
				<div className='card-action'>
					<a href='#!'>{name}</a>
					<a className='blue-text'>
						<Moment format='MMMM Do YYYY' date={new Date(parseInt(createdAt, 10))} />
					</a>
				</div>
			</div>
		</div>
	);
};

AnswerItem.propTypes = {
	answer: PropTypes.object.isRequired,
};

export default AnswerItem;
