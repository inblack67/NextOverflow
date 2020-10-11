import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { fetchSingleQuestionQuery } from '../../src/queries/questions';
import Preloader from '../../components/Preloader';
import { RenderMarkdown } from 'use-syntaxer';
import Answers from '../../components/Answers';
import AddAnswer from '../../components/AddAnswer';
import Comments from '../../components/Comments';
import AddComment from '../../components/AddComment';
import FormatDate from '../../components/FormatDate';
import { Fragment } from 'react';

const SingleQuestion = () => {
	const router = useRouter();
	const { query: { id } } = router;

	const { loading, data } = useQuery(fetchSingleQuestionQuery, {
		variables: {
			id,
		},
	});

	const onDelete = (e) => {};

	if (loading) {
		return <Preloader />;
	}

	const { question } = data;

	return (
		<div className='container'>
			<p className='flow-text center red-text'>Question</p>
			<div className='card grey darken-4'>
				<div className='card-content'>
					<span className='card-title'>{question.title}</span>
					<RenderMarkdown code={question.description} />
					<p>
						~ <span className='grey-text'>{question.user.name}</span>
					</p>
					<p className='blue-text'>
						<FormatDate createdAt={question.createdAt} />
					</p>
				</div>
				<div className='card-action'>
					<a href='#!'>{question.tags}</a>
					{question.user._id === question._id && (
						<Fragment>
							<a href='#!' onClick={onDelete} className='red-text'>
								Delete
							</a>
						</Fragment>
					)}
				</div>
			</div>
			<div>
				<Answers question={id} />
				<AddAnswer question={id} />
				<Comments question={id} />
				<AddComment question={id} />
			</div>
			<div
				style={{
					height: '10rem',
				}}
			/>
		</div>
	);
};

export default SingleQuestion;
