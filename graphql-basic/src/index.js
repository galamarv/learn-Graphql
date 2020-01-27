import {GraphQLServer} from 'graphql-yoga';

// Type definitions (schema)

const typeDefs = `
    type Query {
       title: String!
       price: Float!
       releaseYear: Int
       rating: Float
       inStock: Boolean!
    }
`;

// Resolvers

const resolvers = {
    Query: {
        title() {
            return 'produk 1'
        },
        price() {
            return 12345.12
        },
        releaseYear() {
            return 1835
        },
        rating() {
            return null
        },
        inStock() {
            return false
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