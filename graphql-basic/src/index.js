import {GraphQLServer} from 'graphql-yoga';

// Type definitions (schema)

const typeDefs = `
    type Query {
       post: Post!
       add(a: Float!, b: Float!): Float!
       adds(numbers: [Float!]!): Float!
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
        add(parent, args, ctx, info) {
            //return `${args.a} + ${args.b} = ${args.a + args.b}`
            return args.a + args.b
        },
        adds(parent, args, ctx, info) {
            if (args.numbers.length === 0){
                return 0
            } else {
                return args.numbers.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                })
            }
        }, 
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