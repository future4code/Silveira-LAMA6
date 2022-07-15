import { idGenerator } from "../Services/idGenerator";
import ShowDataBase from "../Data/ShowDataBase";
import Show from "../Model/Show";
import { ShowType } from "../types/ShowTypes";
import { lineUpType } from "../types/headlineType";

export default class ShowBusiness {

    constructor(
        private showDataBase: ShowDataBase,
        private idGenerator: idGenerator,

    ) { }
    createShow = async (input: ShowType, authorizationToken: string) => {

        const tokenAuthorization = authorizationToken

        const { week_day, start_time, end_time, band_id } = input

        if (!tokenAuthorization) {
            throw new Error("You need an access token to create a band.")
        }

        if (!week_day || !start_time || !end_time || !band_id) {
            throw new Error("Please fill in the fields above correctly!")
        }

        const weekDay = week_day.toLowerCase()

        if (weekDay !== "sexta" && weekDay !== "sabado" && weekDay !== "domingo") {
            throw new Error("Invalid day.")
        }

        const startTime: number = Number(start_time)
        const endTime: number = Number(end_time)

        if ((startTime < 8 || startTime > 22) || endTime < 9 || endTime > 23) {
            throw new Error("Invalid show hour.")
        }

        if (startTime.toString().length > 2 || endTime.toString().length > 2) {
            throw new Error("The show time must be complete.")
        }

        const timeShowResult = await this.showDataBase.getByTimeShow(weekDay, startTime)

        if (timeShowResult) {
            throw new Error("This hour is already reserved.")
        }

        const id = this.idGenerator.generateId();

        const newShow = new Show(
            id,
            week_day,
            start_time,
            end_time,
            band_id,
        )
        await this.showDataBase.createNewShow(newShow)
    }
    returnShows = async (week_day: string, authorizationToken: string) => {
        const tokenAuthorization = authorizationToken

        if (!tokenAuthorization) {
            throw new Error("You need an access token to create a band.")
        }
        if (!week_day) {
            throw new Error("Show doens´t exist on this date.")
        }
        const weekDay = week_day.toLowerCase()

        if (weekDay !== "sexta" && weekDay !== "sabado" && weekDay !== "domingo") {
            throw new Error("Invalid day.")
        }
        const showsDateWeek: Array<lineUpType> = await this.showDataBase.getShowByDay(week_day)

        if(!showsDateWeek){
            throw new Error("There will be no shows on that date.")
        }
        return showsDateWeek
    }
}


