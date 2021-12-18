import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

var connection = null;

async function dbConnection() {
    const opt = { useUnifiedTopology: true, useNewUrlParser: true };
    //mongoose.Promise = global.Promise;
    mongoose.set("debug", true);
    if (connection == null) {
        connection = mongoose.connect(
            process.env.MONGODB_CONNECTION,
            opt,
            (res, err) => {
                console.log("Connected to MongoDB")
            }
        )
        return connection;
    }
    return connection;
}

export default dbConnection;
