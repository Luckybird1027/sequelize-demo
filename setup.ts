import express from "express";
import cookieParser from "cookie-parser";
import { createLogger } from "@liplum/log";
import { UserUpdateReq, UserModel, UsercreateReq } from "./model.js";
import bcrypt from "bcryptjs"

export const log = createLogger();
export const app: express.Express = express();
export const userRouter: express.Router = express.Router();

app.use(cookieParser());
app.use(express.json());

const v1 = express.Router();
app.use("/v1", v1);
v1.use("/user", userRouter);

userRouter.post("/", async (req, res) => {
    const userCreateReq: UsercreateReq = req.body;
    userCreateReq.password = await bcrypt.hash(userCreateReq.password, 10);
    await UserModel.create(userCreateReq)
        .then((userPO) => {
            res.status(201).json({
                id: userPO.id,
                username: userPO.username,
                email: userPO.email,
                telephone: userPO.telephone,
            });
        })
        .catch((error) => {
            log.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        })
})

userRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const userUpdateReq: UserUpdateReq = req.body;
    await UserModel.update(userUpdateReq, { where: { id }, returning: true })
        .then((result) => {
            res.status(200).json({
                id: result[1][0].id,
                username: result[1][0].username,
                email: result[1][0].email,
                telephone: result[1][0].telephone
            })
        })
        .catch((error) => {
            log.error(error);
            res.status(500).json({ error: "Internal Server Error" })
        })
})