import { gql } from '@apollo/client';
export const loginUser = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id_
                username
            }   
        }
    }
`;
export const registerUser = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            token
            user {
                id_
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
    }
`;
export const addBook = gql`
    mutation addBook($book: InputBook!) {
        addBook(newBook: $newBook) {
            id_
            username
            email
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
export const removeBook = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            id_
            username
            email
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
            
