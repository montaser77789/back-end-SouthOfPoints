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
    origin: ["http://localhost:5173", "https://south-zone-points.vercel.app"],
    credentials: true
  }));
  

const userRouter = require('./routers/user_router');



app.use('/app/user', userRouter);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
