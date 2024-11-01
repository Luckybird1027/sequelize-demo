import express from "express";
import cookieParser from "cookie-parser";
import { createLogger } from "@liplum/log";
import { toVO, UserCreateReq, UserModel } from "./model.js";

export const log = createLogger();
export const app: express.Express = express();
export const userRouter: express.Router = express.Router();

app.use(cookieParser());
app.use(express.json());

const v1 = express.Router();
app.use("/v1", v1);
v1.use("/user", userRouter);

userRouter.post("", async (req, res) => {
    const userCreateReq: UserCreateReq = req.body;
    await UserModel.create(userCreateReq)
        .then((userPO) => {
            res.status(201).json(toVO(userPO));
        })
        .catch((error) => {
            log.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        })
})