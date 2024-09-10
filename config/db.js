const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const config = require('config');
const db = config.get('mongoURI');

// const connectDB = async () => {
//     try{
//         const client = new MongoClient(db, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect(err => {
//             const collection = client.db("test").collection("devices");
//             // perform actions on the collection object
//             client.close();
//         });
        
//         console.log('MongoDB Connected...');
//     } catch(err){
//         console.error(err.message);
//         // Exit process with failure
//         process.exit(1);
//     }
// }

const connectDB = async () => {
    try{
        // Connect returns promise hence add await
        await mongoose.connect(db);

        console.log('MongoDB Connected...');
    } catch(err){
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;