const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User {
        id_: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type auth {
        token: ID
        user: User
    }
    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    input InputBook {
        bookId: string
        authors: [String]
        title: String
        description: String
        image: String
        link: String
    }
    type Query {
        getUser: User
    }
    type Mutation {
        login(username: String!, password: String!): auth
        register(username: String!, email: String!, password: String!): auth
        addBook(book: InputBook!): User
        removeBook(bookId: String!): User
    }
`;
module.exports = typeDefs;