import { gql } from '@apollo/client';

export const loginMutation = gql`
mutation ($email: String!, $password: String!){
  login(email:$email, password:$password){
    name
    email
    _id
  }
}
`;

export const registerMutation = gql`
mutation ($name: String!, $email: String!, $password: String!){
  register(name: $name, email:$email, password:$password){
    name
    email
    _id
  }
}
`;

