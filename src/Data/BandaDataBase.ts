import { BaseDatabase } from "./BaseDataBase";
import { Banda } from "../Model/Banda";

export default class BandaDataBase extends BaseDatabase {
    protected tableName = "Banda_Lama"
    

    public async createBandaByName (banda: Banda): Promise<void> {
        await BaseDatabase.connection()
        .insert({
            id: banda.getId(),
            name: banda.getName(),
            music_genre: banda.getMusicGenre(),
            responsible: banda.getResponsible()
        })
        .into(this.tableName)
    }

    public async getBandByNameOrId (accessInfo: string):Promise<Banda> {
        const [searchResult] = await BaseDatabase.connection.raw(`
        SELECT *
        FROM ${this.tableName}
        WHERE id = "${accessInfo}" OR name = "${accessInfo}"
        `)
        return searchResult
    }
    
}