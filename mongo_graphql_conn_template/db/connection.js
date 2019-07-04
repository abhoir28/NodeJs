import { MongoClient } from 'mongodb';
import { DATABASE_URL, DATABASE_NAME, DATABASE_USER, DATABASE_PASS, DATABASE_URL_LOCAL } from '../config';

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.

let PROD_URI = "'mongodb://" + DATABASE_USER + ":" + DATABASE_PASS + "@" + DATABASE_URL;
 let LOCAL_URI = `mongodb://${DATABASE_URL_LOCAL}`;
// const MKTG_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>";

async function connect(autUrl) {
    const client = await MongoClient.connect(autUrl,{ useNewUrlParser: true });
    console.log("Got DB Connection");
    return client.db(DATABASE_NAME);
}


export default async function () {

    // console.log(PROD_URI);

    let database = await connect(LOCAL_URI);

    return {
        production: database
    };
}