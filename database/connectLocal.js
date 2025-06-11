import mongoose from "mongoose";

const connectToMongodbLocal = async() => {
  try {
    await mongoose.connect(`${process.env.MONGODB_LOCAL_URI}/BCard`);
    console.log('Connect to local Mongodb');
  } catch (error) {
    console.log(`Error connecting to local Mongodb: ${error}`);
    process.exit(1);
  }
};

export default connectToMongodbLocal;