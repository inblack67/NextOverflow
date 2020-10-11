import { useQuery } from '@apollo/client';
import { fetchAllQuestionsQuery } from '../src/queries/questions';
import Preloader from '../components/Preloader';
import QuestionItem from '../components/QuestionItem';


const index = () => {
	const { loading, data } = useQuery(fetchAllQuestionsQuery);

	if (loading) {
		return <Preloader />;
	}

	return (
		<div className='container'>
			<p className='flow-text center'>Questions</p>
			<div className='row'>
				{data &&
					data.questions &&
					data.questions.length > 1 &&
					data.questions.map((question) => <QuestionItem question={question} key={question._id} />)}
			</div>
		</div>
	);
};

export default index;
