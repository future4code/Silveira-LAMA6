import express from "express"
import ShowController from '../Controller/ShowController'
import ShowBusiness from '../Business/ShowBusiness'
import { idGenerator } from "../Services/idGenerator"
import ShowDataBase from "../Data/ShowDataBase"

const showBusiness = new ShowBusiness(
    new ShowDataBase(),
    new idGenerator()
)

const showController = new ShowController(
    showBusiness
)

export const showRouter = express.Router()

showRouter.post("/reservate", showController.createShow)
showRouter.get("/lineUp", showController.getByShow)