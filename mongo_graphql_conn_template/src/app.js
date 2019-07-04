import {
    GraphQLServer
} from 'graphql-yoga';
import initializeDatabases from '../db/connection';
import {
    loginModel
} from '../resolvers/model';
// import {calculationMap,calculationMap1} from '../resolvers/model';

let db;


const typeDefs = `
    scalar JSON

    type Query {
        parameter(name: String): String!
        userDetails(query: String): [User!]!
        loginMeettle(email: String!, loginType: String!, profileName: String!, profileImage: String!): loginDetailsResponse!
    }

    type User {
        id: ID!
        name: String!
        url: [String]
    }

    type loginDetailsResponse{
        resultStatus: String!
    }
`;

const resolvers = {
    Query: {
        userDetails(parent, args, ctx, info) {

            if (!args.query)
                return users;
            return users.filter((user) => {
                // return user.name.toLowerCase().includes(args.query.toLowerCase())
                return user.name.includes(args.query);
            });
        },
        parameter(parent, args, ctx, info) {
            return "Parameter Entered : " + args.name;
        },
        loginMeettle(parent, args, ctx, info) {

            const status = loginModel(db, args.email, args.loginType, args.profileName, args.profileImage);

            return {
                "resultStatus": status
            };
        }

    }
};


const server = new GraphQLServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});





const options = {
    port: 7005,
    endpoint: '/test',
    cors: {
        // credentials: true,
        // origin: ["http://localhost:8100", "https://rrlab.co.in", "http://localhost", "http://127.0.0.1:7005/test"] // your frontend url.
    }
};


initializeDatabases().then(dbs => {
    // Initialize the application once database connections are ready.
    db = dbs.production;
    server.start(options, () => {
        console.log('Server Up');
    });
}).catch(err => {
    console.error('Failed to make database connections');
    console.error(err);
    process.exit(1);
});