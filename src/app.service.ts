import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import PrismaService from './prisma';
import { RegisterUserDTO } from './dto/register-user.dto';
import { compare, compareSync, hashSync } from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { equal } from 'assert';

@Injectable()
export class AppService {
  constructor(private readonly prisma : PrismaService,
  private readonly jwtService: JwtService){

  }
  async register(data : RegisterUserDTO) {
     try {
      const user = await this.prisma.user.findFirst({
         where : {
         username : data.username
         }
        })
        if(user != null) throw new BadRequestException("Username ini Sudah Digunakan")
        const hash = hashSync(data.password, 10)

        const newUser = await this.prisma.user.create({
         data : {
         username : data.username,
         password : hash,
         }
        })
        
        return newUser
        
        //lanjutan dari kodenya di sini
     }catch(err) {
        if(err instanceof HttpException) throw err
    
     
         throw new InternalServerErrorException("Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit")
     }
     }
     async searchMahasiswa(nim?: string) {
      try {
        console.log(nim)
        const mahasiswa = await this.prisma.mahasiswa.findFirst({
          where:{
            nim:nim ? {equals:nim}:undefined,
          },
        });
        if (!mahasiswa){
          throw new NotFoundException('Mahasiswa tidak ditemukan')
        }
        return  mahasiswa
      } catch (error) {
        throw new InternalServerErrorException('Ada masalah pada server');
      }
    }
    

    async uploadMahasiswaFoto(nim: string, file: Express.Multer.File) {  {
      const mahasiswa = await this.prisma.mahasiswa.findFirst({ where: { nim } });
      if (!mahasiswa) throw new NotFoundException('Mahasiswa Tidak Ditemukan');
    
      if(!existsSync(join(__dirname, '../uploads/') )) {
        mkdirSync(join( __dirname, '../uploads/'))
      } 
      
      if (mahasiswa.foto_profile) {
        const filePath = join(__dirname, '../uploads/', mahasiswa.foto_profile);
        if (existsSync(filePath)) {
          rmSync(filePath);
        }
      }
      const uploadedFile = join(__dirname, '../uploads/');
      const fileExt = extname(file.originalname);
      const baseFilename = mahasiswa.nim;
      const uniqueSuffix = Date.now() +'-'+ Math.round(Math.random() * 1e9);
      const filename = `${baseFilename}-${uniqueSuffix}${fileExt}`;
      const filePath = `${uploadedFile}${filename}`;
    
      console.log(filePath)
      writeFileSync(filePath, file.buffer);
      await this.prisma.mahasiswa.update({
        where: { nim },
        data: { foto_profile: filename },
      });
    
      return filename;
    
    }
    
    
    }
    
    async getMahasiswaFoto(nim: string) {
      const mahasiswa = await this.prisma.mahasiswa.findFirst({
          where: { nim },
      });
    
      if (!mahasiswa) throw new NotFoundException('Mahasiswa Tidak Ditemukan');
      return mahasiswa.foto_profile;
    }

     async auth(user_id : number) {
     try {
       const user = await this.prisma.user.findFirst({
      where : {
       id : user_id
      }
      })
       if(user == null) throw new NotFoundException("User Tidak Ditemukan")
       return user
       }catch(err) {
      if(err instanceof HttpException) throw err
      throw new InternalServerErrorException("Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit")
     }
     } 
      

     async login(data: LoginUserDTO) {
      try {
        const user = await this.prisma.user.findFirst({
          where: {
            username: data.username,
          },
        });
        if (user == null)
          throw new BadRequestException('Username Tidak ditemukan');
        if (!compareSync(data.password, user.password))
          throw new BadRequestException('Password Salah');
        const payload = {
          username : user.username,
          role : user.role
        }
        const token = await this.jwtService.signAsync(payload)

        return {
          token : token,
          user
        }
        
      } catch (error) {
        throw new InternalServerErrorException('Ada masalah pada server');
      }
    }
   
    

  getHello(): string {
    return 'Hello World!';
  }

  getMahasiswa() {
    return this.prisma.mahasiswa.findMany()
  }

  async addMahasiswa(data : CreateMahasiswaDTO) {
    const mahasiswa = 
    await this.prisma.mahasiswa.findFirst({
      where : {
        nim : data.nim
      }
    })

    if(mahasiswa != null) throw new NotFoundException("Mahasiswa dengan nim ini sudah ada")
    
    await this.prisma.mahasiswa.create({
      data : data
    });

    return this.prisma.mahasiswa.findMany()
  }

  async getMahasiswByNim(nim : string) {
    const mahasiswa = 
    await this.prisma.mahasiswa.findFirst({
      where : {
        nim : nim
      }
    })

    if(mahasiswa == null) throw new NotFoundException("Tidak Menemukan NIM")
    return mahasiswa
  }

  async menghapusMahasiswa(nim : string) {
    const mahasiswa = 
    await this.prisma.mahasiswa.findFirst({
      where : {
        nim : nim
      }
    })

    if(mahasiswa == null) throw new NotFoundException("Tidak Menemukan NIM")
    await this.prisma.mahasiswa.delete({
      where : {
        nim : nim
      }
    })  
    
    return this.prisma.mahasiswa.findMany()
    
  }
  async updateMahasiswa(nim: string, data: CreateMahasiswaDTO) {
    const mahasiswa = await this.prisma.mahasiswa.findUnique({ where: { nim } });

    if (!mahasiswa) {
      throw new NotFoundException('Mahasiswa dengan NIM ini tidak ditemukan');
    }

    return this.prisma.mahasiswa.update({
      where: { nim },
      data,
    });
  }
}