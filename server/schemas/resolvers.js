const { User } = require('../models');
const { AuthenticationError } = require('apollo-server');
const { signToken } = require('../utils/token');

const resolvers = {
    Query: {
        getUser: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findById({id_: context.user.id}).select('V_V -password');
                return userData;
            }
            throw new AuthenticationError('You must be logged in to do that')
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {
                token,
                user,
            };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }
            const rightPassword = await user.isCorrectPassword(password);
            if (!rightPassword) {
                throw new AuthenticationError('Invalid credentials');
            }
            const token = signToken(user);
            return {
                token,
                user,
            };
        },
        addBook: async (parent, { newBook }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { id_: context.user.id },
                    { $push: { savedBooks: newBook } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You must be logged in to do that')
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { id_: context.user.id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You must be logged in to do that');
        }
    }
};
module.exports = resolvers;


              