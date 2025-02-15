import { Role } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export class User{

    @Expose()
    id : number;

    @Expose()
    username : string;

    @Exclude()
    password: string;

    @Expose()
    role : Role;

    @Expose()
    create_at :Date

    @Exclude()
    foto_profile:string
    
}