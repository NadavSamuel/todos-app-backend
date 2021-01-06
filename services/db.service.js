const MongoClient = require('mongodb').MongoClient;

const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'todo_db';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}
// {
//     "_id" : ObjectId("5fe311f417f46f8b89b8a06f"),
//     "byUser" : "sammy",
//     "todos" : [ 
//         {
//             "_id" : ObjectId("5fe05f1872d6234b0c787d26"),
//             "title" : "ffgg ss  fewfew",
//             "txt" : "ffs as",
//             "type" : "txt",
//             "created" : 1608539928937.0,
//             "pinned" : false,
//             "lastUpdated" : ISODate("2020-12-21T09:06:02.022Z"),
//             "time" : {
//                 "stamp" : "6908626410839998465"
//             }
//         }, 
//         {
//             "_id" : ObjectId("5fdb7aa098bd59353897cfdf"),
//             "title" : "Sexiest mf on earth!?",
//             "txt" : "https://www.jamd.ac.il/sites/default/files/styles/900x500/public/jazz_mc_Chris_Potter_20.jpg?itok=Y9H9f_vg",
//             "type" : "img",
//             "created" : 1608219296984.0,
//             "pinned" : true,
//             "lastUpdated" : 1608477363799.0,
//             "bgc" : "orange"
//         }
//     ]
// }




