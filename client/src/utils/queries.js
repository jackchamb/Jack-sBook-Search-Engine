import { gql } from 'apollo/client';
export const loginUser = gql`
{
  login {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
  }
}
}
`;