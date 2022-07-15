import { User } from "../Model/User";
import { BaseDatabase } from "./BaseDataBase";

export default class UserData extends BaseDatabase {
    protected tableName = "User_Lama"

    public async createUser (newUser: User): Promise<void> {
        try {
            await BaseDatabase.connection()
                .insert({
                    id:newUser.getId(),
                    name:newUser.getName(),
                    email:newUser.getEmail(),
                    password:newUser.getPassword(),
                    role:newUser.getRole()
                })
                .into(this.tableName)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async login(email: string): Promise<any> {
        const result = await BaseDatabase.connection()
            .select("*")
            .from(this.tableName)
            .where({ email })
        return result[0]
    }
    
}

