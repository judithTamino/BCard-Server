import mongoose from "mongoose";

const connectToAtlas = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_ATLAS_URI}/BCard`);
    console.log('Connect to Atlas Database');
  } catch (error) {
    console.log(`Error connecting to Atlas Database: ${error}`);
    process.exit(1);
  }
};

export default connectToAtlas;