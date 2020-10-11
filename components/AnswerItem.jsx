import PropTypes from 'prop-types';
import { RenderMarkdown } from 'use-syntaxer';

const AnswerItem = ({ answer: { content, user: { name } } }) => {
	return (
		<div className='col s12 m6 l6'>
			<div className='card black'>
				<div className='card-content'>
					<RenderMarkdown code={content} />
				</div>
				<div className='card-action'>
					<a href='#!'>{name}</a>
				</div>
			</div>
		</div>
	);
};

AnswerItem.propTypes = {
	answer: PropTypes.object.isRequired,
};

export default AnswerItem;
