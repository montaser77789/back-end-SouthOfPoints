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

// ✅ تمكين CORS مع السماح بجميع الطلبات
app.use(cors({
    origin: "https://south-zone-points.vercel.app",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

// ✅ التعامل مع طلبات OPTIONS لتجنب خطأ 404
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://south-zone-points.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

// ✅ استيراد الراوتر والتأكد من وجود مسار `/login`
const userRouter = require('./routers/user_router');
app.use('/app/user', userRouter);

// ✅ توثيق API باستخدام Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ الاتصال بقاعدة البيانات
connection();

// ✅ تشغيل السيرفر على البورت المحدد
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
