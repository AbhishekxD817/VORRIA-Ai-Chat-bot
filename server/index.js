import express from 'express'
import mongoose from 'mongoose';
import 'dotenv/config'
import AppError from './utils/ErrorHandlers/AppError.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routers/authRouter.js'
import chatsRouter from './routers/chatRouter.js';



const app = express();
const corsOptions = {
    origin: "https://vorria-ai.netlify.app",
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT, async () => {
    console.log("Server started => http://localhost:" + process.env.PORT);
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        process.exit(1);
        return;
    }
})


app.get("/", (req, res, next) => {
    return res.send("Server Started...")
})

app.use("/auth", authRouter);
app.use("/chat", chatsRouter);





// error handlers
app.all("*", (req, res, next) => {
    return next(new AppError(404, "Not Found"));
})

app.use((error, req, res, next) => {
    const { status = 500, message = "Internal Server Error" } = error;
    return res.status(status).json({
        message
    })
})