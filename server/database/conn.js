import mongoose from "mongoose";

/** Mongo Db memory server is used in place of mongoDB in Development mode */
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){
    const mongodb = await MongoMemoryServer.create();
    const getUri = mongodb.getUri();

    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(getUri);
    console.log('Database Connected')
    return db;
}

export default connect;