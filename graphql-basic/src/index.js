import {
    GraphQLServer
} from 'graphql-yoga';

// Type definitions (schema)

// Demo user data 
const users = [{
    id: '1',
    name: 'Satu',
    email: 'satu@mail.com',
    age: 24
}, {
    id: '2',
    name: 'Sadu',
    email: 'dua@mail.com',
    age: 22
}, {
    id: '3',
    name: 'tiga',
    email: 'tiga@mail.com',
    age: 20
}];

const posts = [{
    id: '1',
    title: 'judul',
    body: 'ini tulisan',
    published: true
}, {
    id: '2',
    title: 'bukan judul',
    body: 'itu text',
    published: false
}, {
    id: '3',
    title: 'apakah ini judul',
    body: 'qwerty asdfg',
    published: true
}];


const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
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
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            } else {
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            } else {
                return posts.filter((post) => {
                    const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                    const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                    return isTitleMatch || isBodyMatch
                })
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