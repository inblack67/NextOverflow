import { useQuery } from '@apollo/client';
import { fetchAllQuestionsQuery } from '../src/queries/questions';
import Preloader from '../components/Preloader';
import { initializeApollo } from '../src/apollo';
import QuestionItem from '../components/QuestionItem';
import Link from 'next/link';

const index = () => {

    const { loading, data } = useQuery(fetchAllQuestionsQuery);

    if (loading) {
        return <Preloader />
    }

    const { questions } = data;

    return (
        <div className='container'>
            <p className="flow-text center">Questions</p>
            <div className="row">
                {questions.map(question => <QuestionItem question={question} key={question._id} />)}
            </div>
            <div className="fixed-action-btn">
                <Link href='/ask-question'>
                    <a className="btn-floating red pulse">
                        <i className="large material-icons">add</i>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export const getStaticProps = async () => {
    const apolloClient = initializeApollo();
    await apolloClient.query({
        query: fetchAllQuestionsQuery
    });
    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        }
    }
}

export default index;
