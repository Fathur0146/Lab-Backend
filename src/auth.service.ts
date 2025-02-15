import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register({ username, password }: RegisterUserDTO) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { username, password: hashedPassword },
    });

    return { message: "User registered successfully", user };
  }

  async login({ username, password }: LoginUserDTO) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return { message: "Login successful", token: this.jwtService.sign({ id: user.id, username }) };
  }
}
