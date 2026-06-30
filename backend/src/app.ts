import express, { type Request, type Response, type NextFunction } from "express";
import { config } from "dotenv";
import { connectDB } from './configs/db.config.js';
import { createUsersTable } from './models/user.model.js';
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';
import potholeRouter from './routes/pothole.route.js';
import imageRouter from './routes/image.route.js';
import voteRouter from './routes/vote.route.js';
import { createPotholesTable } from './models/pothole.model.js';
import { createPotholeImagesTable } from './models/pothole-image.model.js';
import { createPotholeVotesTables } from "./models/pothole-vote.model.js";
import cors, { type CorsOptions } from "cors";
import envVars from './configs/env.config.js';

config();

await connectDB();
await createUsersTable();
await createPotholesTable();
await createPotholeImagesTable();
await createPotholeVotesTables();

const app = express();

const { frontendUrl } = envVars;
const corsOptions: CorsOptions = {
    origin: frontendUrl,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/potholes", potholeRouter);
app.use("/images", imageRouter);
app.use("/votes", voteRouter);

app.use((error: Error, _: Request, response: Response, next: NextFunction) => {
    console.error(error);

    return response.status(500).json({
        message: "Internal server error",
        details: "Something went wrong"
    });
});


const appPort = process.env.APP_PORT;
app.listen(appPort, () => {
    console.log(`Server running at http://localhost:${appPort}`);
});
