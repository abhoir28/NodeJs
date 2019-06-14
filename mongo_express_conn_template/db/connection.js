import {
    MongoClient
} from 'mongodb';

import {
    DATABASE_URL,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASS
} from '../config';

//with username auth pass
// let CONN_URI = "'mongodb://" + DATABASE_USER + ":" + DATABASE_PASS + "@" + DATABASE_URL;
//without username pass auth
let CONN_URI = "'mongodb://" + DATABASE_URL;

async function connect(AUTH_URL) {
    const client = await MongoClient.connect(AUTH_URL, {
        useNewUrlParser: true
    });
    console.log("Got DB Connection");
    return client.db(DATABASE_NAME);
}

export default async function () {
    let database = await connect(CONN_URI);

    return {
        database
    };
}