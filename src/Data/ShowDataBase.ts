import { BaseDatabase } from './BaseDataBase';
import Show from '../Model/Show';
import { lineUpType } from '../types/headlineType';

export default class ShowDataBase extends BaseDatabase {
    protected tableName = "Show_Lama"
    protected bandTable = "Banda_Lama"


    public async createNewShow(Show: Show): Promise<void> {
        await BaseDatabase.connection()
            .insert({
                id: Show.getId(),
                week_day: Show.getWeekDay(),
                start_time: Show.getStartTime(),
                end_time: Show.getEndTime(),
                band_id: Show.getBandId()
            })
            .into(this.tableName)
    }

    public async getByTimeShow(day: string, hour: number): Promise<any> {
       
        const [[timeShowResult]] = await BaseDatabase.connection.raw(`
        SELECT *
        FROM ${this.tableName}
        WHERE week_day = "${day}" AND start_time = "${hour}"
        `)
        return timeShowResult
    } 

    public async getShowByDay(day: string): Promise<lineUpType[]> {
        const [showsResult] = await BaseDatabase.connection.raw(
            `
            SELECT Banda_Lama.name, Banda_Lama.music_genre
            FROM Banda_Lama
            JOIN Show_Lama
            ON Banda_Lama.id = Show_Lama.band_id
            WHERE Show_Lama.week_day = "${day}"
            ORDER BY Show_Lama.start_time
            `
        )

        return showsResult
    }
}