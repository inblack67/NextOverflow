import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { fetchSingleUserQuery } from '../../src/queries/users';
import Preloader from '../../components/Preloader';
import { RenderMarkdown } from 'use-syntaxer';
import FormatDate from '../../components/FormatDate';
import DevItem from '../../components/DevItem';
import { Fragment } from 'react';
import IsAuthenticated from '../../components/IsAuthenticated';

const SingleDev = () => {
	const router = useRouter();
	const { query: { id } } = router;

	const { loading, data } = useQuery(fetchSingleUserQuery, {
		variables: {
			id,
		},
	});

	if (loading) {
		return <Preloader />;
	}

	const { user: { name, image, createdAt, answers, comments, questions } } = data;

	return (
		<Fragment>
			<IsAuthenticated />
			<div className='container'>
				{data &&
				data.user && (
					<Fragment>
						<div>
							<div className='card grey darken-4'>
								<div className='card-image'>
									<img src={image} alt={name} className='responsive-img' />
									<span className='card-title'>{name}</span>
								</div>
								<div className='card-content'>
									<p>
										Member since:{' '}
										<span className='blue-text'>
											<FormatDate createdAt={createdAt} />
										</span>
									</p>
								</div>
								<div className='card-action'>
									<a href='#!'>{questions.length} Questions</a>
									<a href='#!'>{answers.length} Answers</a>
									<a href='#!'>{comments.length} Comments</a>
								</div>
							</div>
							<div
								style={{
									height: '10rem',
								}}
							/>
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default SingleDev;
