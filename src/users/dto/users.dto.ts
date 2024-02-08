import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateuserDto{
    @IsString()
   readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(7)
    readonly password: string;

    readonly role: string;

}