import express from "express";
import cors from "cors";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { userRouter } from "../router/UserRouter";
import { bandRouter } from "../router/BandRouter";
import { showRouter } from "../router/ShowRouter";

dotenv.config()

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter)
app.use("/banda", bandRouter)
app.use("/show", showRouter)


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});  

