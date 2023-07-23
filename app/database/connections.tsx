import mongoose from "mongoose";


const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}
const databaseUri: string | any = process.env.AUTH_DATABASE_URI;

let isConnectionLive = false;

export const connectToDatabase = async () => {


    mongoose.set('strictQuery', true);
    if (isConnectionLive) {
        console.log('Mongo Database connection is present.')
    }
    else {
        try {
            await mongoose.connect(databaseUri, options);
            isConnectionLive = true;
            console.log('Mongo Database connection established.')
        } catch (error) {
            console.log(error);
            console.log('Mongo Database connection can not be established.')
        }
    }
}