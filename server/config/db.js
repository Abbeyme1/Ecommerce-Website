import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("connected to mongodb".cyan.underline);
  } catch (err) {
    console.log(`ERR: ${err}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
