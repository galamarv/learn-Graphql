import {GraphQLServer} from 'graphql-yoga';

// Type definitions (schema)

const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
    }
`;

// Resolvers

const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Fattah'
        },
        location() {
            return 'Malang'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log("server is up");
});