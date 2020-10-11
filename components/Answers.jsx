import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { fetchAllAnswersQuery } from '../src/queries/answers';
import AnswerItem from './AnswerItem';
import Preloader from './Preloader';

const Answers = ({ question }) => {
	const { loading, data } = useQuery(fetchAllAnswersQuery, {
		variables: {
			question,
		},
	});

	if (loading) {
		return <Preloader />;
	}

	return (
		<div>
			{data &&
				data.questionAnswers &&
				data.questionAnswers.map((answer) => <AnswerItem key={answer._id} answer={answer} />)}
		</div>
	);
};

Answers.propTypes = {
	question: PropTypes.string.isRequired,
};

export default Answers;
