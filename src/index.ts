require("dotenv").config();
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import isLoggedIn, { IRequestWithUser } from "./middlewares/isLoggedIn";

const port: string | number = process.env.PORT;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", userRouter);

app.listen(port, (): void => {
  console.log("server started successfully");
});
