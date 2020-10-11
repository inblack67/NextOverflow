import PropTypes from 'prop-types';
import { RenderMarkdown } from 'use-syntaxer';
import FormatDate from './FormatDate';

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
						<FormatDate createdAt={createdAt} />
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
