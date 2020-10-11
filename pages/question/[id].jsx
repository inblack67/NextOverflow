import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { fetchSingleQuestionQuery } from '../../src/queries/questions';
import Preloader from '../../components/Preloader';
import { RenderMarkdown } from 'use-syntaxer';

const SingleQuestion = () => {
	const router = useRouter();
	const { query: { id } } = router;

	const { loading, data } = useQuery(fetchSingleQuestionQuery, {
		variables: {
			id,
		},
	});

	if (loading) {
		return <Preloader />;
	}

	const { question } = data;

	return (
		<div className='container'>
			<div className='card grey darken-3'>
				<div className='card-content'>
					<span className='card-title'>{question.title}</span>
					<RenderMarkdown code={question.description} />
					<p>
						~ <span className='grey-text'>{question.user.name}</span>
					</p>
				</div>
				<div className='card-action'>
					<a href='#!'>{question.tags}</a>
				</div>
			</div>
		</div>
	);
};

export default SingleQuestion;
