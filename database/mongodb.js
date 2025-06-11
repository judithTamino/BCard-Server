import connectToAtlas from "./connectAtlas.js";
import connectToMongodbLocal from "./connectLocal.js";

const connectToDB = async () => {
  switch (process.env.ENV) {
    case "development":
      await connectToMongodbLocal();
      break;

    case "production":
      await connectToAtlas();
      break;
  }
}; 

export default connectToDB;