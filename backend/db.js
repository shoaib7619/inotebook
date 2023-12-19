const mongoose = require('mongoose');
const MONGO_URL="mongodb+srv://shoaib7619:11665%40Shoaib@cluster0.fqnfm03.mongodb.net/inotebook"
mongoose.set('strictQuery', true);
const connectToMongo = async () =>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log(`Server is running on ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed)
    }
};
module.exports=connectToMongo;





