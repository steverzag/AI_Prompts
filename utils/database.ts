import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {

    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("MongoDb is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: process.env.DB_NAME,
        });

        isConnected = true;
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
    
}