import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { fetchAllCommentsQuery } from '../src/queries/comments';
import CommentItem from './CommentItem';
import Preloader from './Preloader';

const Comments = ({ question }) => {
	const { loading, data } = useQuery(fetchAllCommentsQuery, {
		variables: {
			question,
		},
	});

	if (loading) {
		return <Preloader />;
	}

	return (
		<div>
			<p className='flow-text red-text center'>Comments</p>
			{data &&
				data.questionComments &&
				data.questionComments.length > 0 &&
				data.questionComments.map((comment) => <CommentItem key={comment._id} comment={comment} />)}
		</div>
	);
};

Comments.propTypes = {
	question: PropTypes.string.isRequired,
};

export default Comments;
