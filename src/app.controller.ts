import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { PassThrough } from 'stream';
import { plainToInstance } from 'class-transformer';
import { User } from './entity/user.entity';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from './user.decorator';



@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}
  @Post("register")
 @ApiBody({type : RegisterUserDTO})
 register(@Body() user : RegisterUserDTO) {
  return this.appService.register(user)
 }
 @Post('login')
@ApiBody({ type: LoginUserDTO })
async login(
  @Body() data: LoginUserDTO,
  @Res({ passthrough: true }) res: Response
) {
  const result = await this.appService.login(data);
  res.cookie("token", result.token);
  result.user = plainToInstance(User, result.user); 
  return result;
}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("mahasiswa")
  getMahasiswa() {
    return this.appService.getMahasiswa();
  }

  @Get("mahasiswa/:nim")
  getMahasiswaByNim(@Param("nim") nim : string) {
    return this.appService.getMahasiswByNim(nim)
  }

  @Get("/auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user : User) {
  return user
  }


  @Post("mahasiswa")
  @ApiBody({type : CreateMahasiswaDTO})
  createMahasiswa( @Body() data : CreateMahasiswaDTO ) {
    return this.appService.addMahasiswa(data)
  }

  @Delete("mahasiswa/:nim")
  deleteMahasiswa( @Param("nim") nim : string ) {
    return this.appService.menghapusMahasiswa(nim)
  }

  @Put('mahasiswa/:nim')
  @ApiBody({ type: CreateMahasiswaDTO })
  updateMahasiswa(@Param('nim') nim: string, @Body() data: CreateMahasiswaDTO) {
    return this.appService.updateMahasiswa(nim, data);
  }
}