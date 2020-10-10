import { useQuery } from '@apollo/client';
import { fetchAllQuestionsQuery } from '../src/queries/questions';
import Preloader from '../components/Preloader';
import QuestionItem from '../components/QuestionItem';
import Link from 'next/link';

const index = () => {
  const { loading, data } = useQuery(fetchAllQuestionsQuery);

  if (loading) {
    return <Preloader />;
  }

  const { questions } = data;

  return (
    <div className='container'>
      <p className='flow-text center'>Questions</p>
      <div className='row'>
        {questions.length >= 1 &&
          questions.map((question) => (
            <QuestionItem question={question} key={question._id} />
          ))}
      </div>
      <div className='fixed-action-btn'>
        <Link href='/ask-question'>
          <a className='btn-floating red pulse'>
            <i className='large material-icons'>add</i>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default index;
