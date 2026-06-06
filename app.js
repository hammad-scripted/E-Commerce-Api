const express=require('express');
const dotenv=require('dotenv');
const dns=require('dns/promises');
require('express-async-errors');
dns.setServers(['1.1.1.1']);
dotenv.config();
const notFoundMiddleware=require('./middleware/not-found');
const errorHandlerMiddleware=require('./middleware/error-handler');
const app=express();


//* database
const connectDB=require('./db/connect');
const port=process.env.PORT || 5000;


//* middleware
app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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