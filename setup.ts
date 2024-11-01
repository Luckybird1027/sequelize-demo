import express from "express";
import cookieParser from "cookie-parser";
import { createLogger } from "@liplum/log";
import { UserModel, UserPO } from "./model.js";

export const log = createLogger();
export const app: express.Express = express();
export const userRouter: express.Router = express.Router();

app.use(cookieParser());

const v1 = express.Router();
app.use("/v1", v1);
v1.use("/user", userRouter);

userRouter.post("/", async (req, res) => {
    const userPO: UserPO = req.body;
    await UserModel.create(userPO)
        .then(() => {
            res.status(201).json(userPO);
        })
        .catch((error) => {
            log.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        })
})