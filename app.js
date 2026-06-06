const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const dns=require('dns/promises');
const cookieParser = require('cookie-parser');
require('express-async-errors');
dns.setServers(['1.1.1.1']);
dotenv.config();
const notFoundMiddleware=require('./middleware/not-found');
const errorHandlerMiddleware=require('./middleware/error-handler');
const app=express();


//* database
const connectDB=require('./db/connect');
const port=process.env.PORT || 5000;

// * routers
const authRouter=require('./routes/authRoute');
const userRouter=require('./routes/userRoute');



//* middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(cookieParser(
    process.env.JWT_SECRET
));


app.get("/",(req,res)=>{
    // console.log(req.cookies);
    // console.log(req.signedCookies);
    res.send("Hello World");
})
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter)
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