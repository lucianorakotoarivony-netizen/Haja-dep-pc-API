import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    id: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
