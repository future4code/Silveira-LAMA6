import UserData from "../Data/UserDataBase"
import { User } from "../Model/User"
import { HashGenerator } from "../Services/hashGenerator"
import { idGenerator } from "../Services/idGenerator"
import { TokenGenerator } from "../Services/tokenGenerator"
import { UserType } from "../types/UserType"

export class UserBusiness {
    constructor(
        private userData: UserData,
        private idGenerator: idGenerator,
        private hashGenerator: HashGenerator,
        private tokenGenerator: TokenGenerator
    ) { }
    createUser = async (input: UserType) => {

        const { name, email, password, role } = input

        if (!name || !email || !password || !role ) {
            throw new Error("Por gentileza preencha os campos acima corretamente!")
        }

        if (email.indexOf("@") === -1) {
            throw new Error("Email Inválido!")
        }

        if (password.length < 6) {
            throw new Error("Password precisa ter no mínimo 6 caracteres!")
        }

        const id = this.idGenerator.generateId();
        const cypherText = await this.hashGenerator.hash(password);

        const newUser = new User(
            id,
            name,
            email,
            cypherText,
            role
        ) 
        await this.userData.createUser(newUser)
        
        const accessToken = this.tokenGenerator.generate({
            id,
            role
        });
        return { accessToken };
    }

    login = async (email: string, password: string) => {
            
        try {
        
            if (!email || !password) {
                throw new Error("All the fields are required")
            }
            
            const userLogin = await this.userData.login(email)

            if (!userLogin) {
                throw new Error("User not found")
            }

            const isPasswordCorrect = await this.hashGenerator.compareHash(password, userLogin.getPassword())

            if (!isPasswordCorrect) {
                throw new Error("Invalid password")
            }

            const token = await this.idGenerator.generateId()

            return token

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}







// export default new UserBusiness(
//     new UserData(),
//     new idGenerator(),
//     new HashGenerator(),
//     new TokenGenerator()
//  )