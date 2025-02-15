import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import prismaService from './prisma';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    JwtModule.register({
      secret:"a123b123c123d123",
      global: true
    }),
    ProfileModule,
    AuthModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, prismaService],
})
export class AppModule {}
