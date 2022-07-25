import { Request, Response } from "express"
import BandaBusiness from "../Business/BandaBusiness"
import { BandaType } from "../types/BandaType"
import { Banda } from "../Model/Banda"

export default class BandaController {

    constructor(
        private bandaBusiness: BandaBusiness
    ) {}
    public createBanda = async (req: Request, res: Response) => {
        try {
            const authorizationToken  = req.headers.authorization as string
            const { name, music_genre, responsible } = req.body
            

            const newBanda: BandaType = {
                name,
                music_genre,
                responsible

            } 
           
            const token = await this.bandaBusiness.newBanda(newBanda, authorizationToken)

            res.status(200).send({ message: "Banda create successfully", token })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    }

    public getBandByIdOrName = async(req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const accessData: string = req.params.idOrName as string

            const bandDescription: Banda = await this.bandaBusiness.getBandByIdOrName(accessData, token)

            res.status(200).send({data: {bandDescription}})

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    } 
}
