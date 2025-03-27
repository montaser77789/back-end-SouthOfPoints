const express = require('express');
const cors = require('cors');
const connection = require("./config/config");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");


const app = express();
app.use(express.json());


app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: "https://south-zone-points.vercel.app", // فرونت إند المسموح له
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
  }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://south-zone-points.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
  
const userRouter = require('./routers/user_router');



app.use('/app/user', userRouter);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connection();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Connection on port ${port}`);
});
