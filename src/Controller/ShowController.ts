import { Request, Response } from "express"
import ShowBusiness from "../Business/ShowBusiness"
import { ShowType } from "../types/ShowTypes"
import { lineUpType } from "../types/headlineType"

export default class ShowController {

    constructor(
        private showBusiness: ShowBusiness
    ) { }
    public createShow = async (req: Request, res: Response) => {
        try {
            const authorizationToken = req.headers.authorization as string
            const { week_day, start_time, end_time, band_id } = req.body


            const newShow: ShowType = {
                week_day,
                start_time,
                end_time,
                band_id

            }

            const token = await this.showBusiness.createShow(newShow, authorizationToken)

            res.status(200).send({ message: "Show create successfully", token })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    }
    public getByShow = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string
            const weekDay: string = req.body.week_day as string

            const returnShowsDay: lineUpType[] = await this.showBusiness.returnShows(weekDay, token)

            res.status(200).send({ data: { returnShowsDay } })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        }
    }
}

