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
    id: '11',
    title: 'judul',
    body: 'ini tulisan',
    published: true,
    author: '1'
}, {
    id: '12',
    title: 'bukan judul',
    body: 'itu text',
    published: false,
    author: '1'
}, {
    id: '13',
    title: 'apakah ini judul',
    body: 'qwerty asdfg',
    published: true,
    author: '2'
}];

const comments = [{
    id: '111',
    text: 'komentar pertama',
    author: '1',
    post: '13'
}, {
    id: '112',
    text: 'second comment',
    author: '1',
    post: '12'
}, {
    id: '113',
    text: 'komen',
    author: '2',
    post: '12'
}, {
    id: '114',
    text: 'last comment',
    author: '3',
    post: '11'
}
]


const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        },
        comments(parent, args, ctx,info) {
            return comments
        }

    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args,ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
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