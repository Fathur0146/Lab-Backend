import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import prismaService from './prisma';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret:"a123b123c123d123"
    })],
  controllers: [AppController],
  providers: [AppService, prismaService],
})
export class AppModule {}
