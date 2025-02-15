import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { RegisterUserDTO } from "./dto/register-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDTO: RegisterUserDTO) {
    return this.authService.register(registerDTO);
  }

  @Post("login")
  async login(@Body() loginDTO: LoginUserDTO) {
    return this.authService.login(loginDTO);
  }
}
