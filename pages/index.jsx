import { useQuery } from '@apollo/client';
import { fetchAllQuestionsQuery } from '../src/queries/questions';
import Preloader from '../components/Preloader';
import QuestionItem from '../components/QuestionItem';
import IsAuthenticated from '../components/IsAuthenticated';
import { Fragment } from 'react';
import { getMeQuery } from '../src/queries/auth';
import { isAuthWithToken, extractTokenFromCookie } from '../src/isAuthenticated';

const index = () => {
	const { loading, data } = useQuery(fetchAllQuestionsQuery);

	const getMeRes = false;

	if (loading || getMeRes.loading) {
		return <Preloader />;
	}

	return (
		<Fragment>
			{/* <IsAuthenticated /> */}
			<div className='container'>
				<p className='flow-text center'>Questions</p>
				<div className='row'>
					{data &&
						data.questions &&
						data.questions.length > 1 &&
						data.questions.map((question) => <QuestionItem question={question} key={question._id} />)}
				</div>
			</div>
		</Fragment>
	);
};

// export const getServerSideProps = async (ctx) => {
// 	let isAuth = false;
// 	const token = extractTokenFromCookie(ctx);
// 	if (token) {
// 		isAuth = await isAuthWithToken(token);
// 	}
// 	if (!isAuth) {
// 		ctx.res.writeHead(302, {
// 			Location: '/login',
// 		});
// 		ctx.res.end();
// 		return { props: {} };
// 	}
// 	return {
// 		props: {},
// 	};
// };

export default index;
