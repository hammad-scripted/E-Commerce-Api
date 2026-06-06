const express=require('express');
const dotenv=require('dotenv');
const dns=require('dns/promises');
dns.setServers(['1.1.1.1']);
const connectDB=require('./db/connect');
dotenv.config();
const app=express();


const port=process.env.PORT || 5000;

const start=async()=>{


    try{

        await connectDB(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch(error){
        console.log(error);
    }
}
start();