import express from 'express';
import { config } from "dotenv";
import { connectDB } from './configs/db.config.js';
import { createUsersTable } from './models/user.model.js';
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js'
import { errorHandler } from './middlewares/error.middleware.js';


config();

await connectDB();
await createUsersTable();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", userRouter);

app.use(errorHandler);

const appPort = process.env.APP_PORT;
app.listen(appPort, () => {
    console.log(`Server running at http://localhost:${appPort}`);
});