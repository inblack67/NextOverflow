import { gql } from '@apollo/client';

export const fetchAllQuestionsQuery = gql`
{
  questions{
    title
    description
    _id
    user{
      name
    }
  }
}
`;

export const addQuestionMutation = gql`
mutation{
  addQuestion(title:"Why Next.js", description:"Why bother?"){
    title
    description
    _id
    user{
      name
    }
  }
}
`;
