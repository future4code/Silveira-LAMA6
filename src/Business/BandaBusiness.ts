import BandaDataBase from "../Data/BandaDataBase"
import { Banda } from "../Model/Banda"
import { idGenerator } from "../Services/idGenerator"
import { BandaType } from "../types/BandaType"

export default class BandaBusiness {
    constructor(
        private bandaDatabase: BandaDataBase,
        private idGenerator: idGenerator,
    ) { }
    newBanda = async (input: BandaType, authorizationToken: string) => {

        const tokenAuthorization = authorizationToken

        const { name, music_genre, responsible, } = input

        if(!tokenAuthorization) {
            throw new Error("You need an access token to create a band.")
        }

        if (!name || !music_genre || !responsible) {
            throw new Error("Por gentileza preencha os campos acima corretamente!")
        }

        const id = this.idGenerator.generateId();

        const bandaNew = new Banda(
            id,
            name,
            music_genre,
            responsible
        )
        await this.bandaDatabase.createBandaByName(bandaNew)

    }

    getBandByIdOrName = async (accessInfo: string , token: string):Promise<Banda> => {

        if(!token) {
            throw new Error("You need an access token to get this information")
        }

        if(!accessInfo) {
            throw new Error("You need to send the band id or name to execute this action.")
        }

        const bandDetails = await this.bandaDatabase.getBandByNameOrId(accessInfo)

        if(!bandDetails) {
            throw new Error("We couldn't find this band.")
        }

        return bandDetails
    } 
}