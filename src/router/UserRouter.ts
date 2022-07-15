import express from "express"
import { UserBusiness } from "../Business/UserBusiness";
import UserController from "../Controller/UserController";
import UserData from "../Data/UserDataBase";
import { HashGenerator } from "../Services/hashGenerator";
import { idGenerator } from "../Services/idGenerator";
import { TokenGenerator } from "../Services/tokenGenerator";

const userBusiness = new UserBusiness(
    new UserData(),
    new idGenerator(),
    new HashGenerator(),
    new TokenGenerator()
)
const userController = new UserController(
    userBusiness
)

export const userRouter = express.Router();

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)



