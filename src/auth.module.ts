import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module";

@Global()
@Module({
  imports: [PrismaModule, JwtModule.register({ secret: "rahasia", signOptions: { expiresIn: '1h' } })],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
