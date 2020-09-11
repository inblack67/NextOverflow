import { gql } from '@apollo/client';

export const fetchAllQuestionsQuery = gql`
query {
  questions{
    title
    description
    tags
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
    tags
    _id
    user{
      name
    }
  }
}
`;

export const fetchSingleQuestionQuery = gql`
query ($id: ID!){
  question(id:$id){
    title
    description
    tags
    user{
      name
    }
  }
}
`;
