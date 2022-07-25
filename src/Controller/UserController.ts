import { Request, Response } from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { UserType } from "../types/UserType"

export default class UserController {

    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const { name, email, password, role } = req.body

            const newUser: UserType = {
                name,
                email,
                password,
                role
            }

            const token = await this.userBusiness.createUser(newUser)


            res.status(201).send({ message: "User created successfully!", token })
        } catch (error: any) {
            console.log(error)
            res.status(400).send({ error: error.message });
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

           
            const token = await this.userBusiness.login(email, password)

            res.status(200).send({ message: "User logged successfully", token })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    }


}
