import {GraphQLServer} from 'graphql-yoga';

// Type definitions (schema)

const typeDefs = `
    type Query {
       post: Post!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers

const resolvers = {
    Query: {
        post() {
            return {
                id: '123asd',
                title: 'judul',
                body: 'isi',
                published: true
            }
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