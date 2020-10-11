import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { RenderMarkdown } from 'use-syntaxer';
import FormatDate from './FormatDate';

const AnswerItem = ({ answer: { content, _id, createdAt, user: { name }, user } }) => {
	const onDelete = (e) => {};

	return (
		<div className='col s12 m6 l6'>
			<div className='card grey darken-4'>
				<div className='card-content'>
					<RenderMarkdown code={content} />
				</div>
				<div className='card-action'>
					<a href='#!'>{name}</a>
					<a href='#!' className='blue-text'>
						<FormatDate createdAt={createdAt} />
					</a>
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

AnswerItem.propTypes = {
	answer: PropTypes.object.isRequired,
};

export default AnswerItem;
