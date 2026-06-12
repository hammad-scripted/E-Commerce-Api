const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const dns=require('dns/promises');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const fileUpload=require('express-fileupload');
require('express-async-errors');
dns.setServers(['1.1.1.1']);
dotenv.config();
const notFoundMiddleware=require('./middleware/not-found');
const errorHandlerMiddleware=require('./middleware/error-handler');
const app=express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


//* database
const connectDB=require('./db/connect');
const port=process.env.PORT || 5000;

// * routers
const authRouter=require('./routes/authRoute');
const userRouter=require('./routes/userRoute');
const productRouter=require('./routes/productRoute');
const reviewRouter=require('./routes/reviewRoute')
const orderRouter=require('./routes/orderRoutes');



//* middleware
app.use(express.json());
app.use(cors({
origin:"*",
methods:"GET,POST,PUT,PATCH,DELETE",
allowedHeaders:"Content-Type,Authorization",
credentials:true
}))
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(cookieParser(
    process.env.JWT_SECRET
));


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',

}));

app.get("/",(req,res)=>{
    // console.log(req.cookies);
    // console.log(req.signedCookies);
    res.send("Hello World");
})
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter);
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/orders',orderRouter)
app.get('/api-docs.json', (req, res) => {
  res.json(swaggerDocument);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customSiteTitle: 'E-Commerce API Docs',
  swaggerOptions: {
    withCredentials: true,
    requestInterceptor: (req) => {
      req.credentials = 'include';
      return req;
    },
  },
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 32px 0; }
    .swagger-ui .info .title { color: #172033; font-size: 38px; }
    .swagger-ui .scheme-container { border-radius: 8px; box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08); }
    .swagger-ui .opblock { border-radius: 8px; box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08); }
    .swagger-ui .btn.execute { background: #0f766e; border-color: #0f766e; }
  `,
}));
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
