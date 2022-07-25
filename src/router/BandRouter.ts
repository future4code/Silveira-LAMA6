import express from "express"
import BandaBusiness from "../Business/BandaBusiness"
import BandaController from "../Controller/BandaController"
import BandaDataBase from "../Data/BandaDataBase"
import { idGenerator } from "../Services/idGenerator"

const bandaBusiness = new BandaBusiness(
    new BandaDataBase(),
    new idGenerator()
)

const bandaController = new BandaController (
    bandaBusiness
)

export const bandRouter = express.Router()

bandRouter.post("/create", bandaController.createBanda)
bandRouter.get("/details/:idOrName", bandaController.getBandByIdOrName)
