require("dotenv").config();
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import isLoggedIn, { IRequestWithUser } from "./middlewares/isLoggedIn";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", userRouter);

app.get("/", isLoggedIn, (req, res) => {
  res.send("you are logged in");
});

app.get("/user", isLoggedIn, (req: IRequestWithUser, res) => {
  console.log(req.user);
  res.json(req.user);
});
app.listen(3000, (): void => {
  console.log("server started successfully");
});
