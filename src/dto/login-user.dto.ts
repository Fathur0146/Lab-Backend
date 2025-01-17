import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, Length, IsNotEmpty } from "class-validator";
export class LoginUserDTO {
 @ApiProperty({
  description : "UserName For Login",
  type : String,
  example : "Fathur"
 })
 @IsString()
 @IsNotEmpty()
 @Matches(/^\S*$/i)
 @Length(1, 30)
 username: string;
 @ApiProperty({
  description : "Password",
  type : String,
  example : "password"
 })
 @IsString()
 @IsNotEmpty()
 @Matches(/^\S*$/i)
 @Length(1, 30)
 password: string;
}
