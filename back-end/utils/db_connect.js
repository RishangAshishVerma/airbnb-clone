import mongoose, { connect } from "mongoose";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database is connected ");
        
    } catch (error) {
        console.log(`erro while connecteing database ${error} `);
        
    }
}

export default connectDb