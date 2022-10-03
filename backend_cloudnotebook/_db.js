const mongoose =require('mongoose')  // Mongoose return promise 
const mongoToUri="mongodb://localhost:27017/cloudbook";
const connectToMongo= ()=>{
    mongoose.connect(mongoToUri,()=>{
        console.log("Hello from db");       // We can use async/await, if dont want use callback function    
    })
}
module.exports=connectToMongo
 