import {IsNotEmpty,IsString,isNotEmpty,Length,IsEnum,} from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { Jenis_Kelamin } from '@prisma/client';
  export class UpdateMahasiswaDTO {
    @ApiProperty({
      description: 'Nama mahasiswa',
      type: String,
      example: 'Muh. Ilham Akbar',
    })
    @IsString()
    @IsNotEmpty()
    nama: string;
  
    @ApiProperty({
      description: 'Kelas mahasiswa',
      type: String,
      example: '5B',
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 12)
    kelas: string;
  
    @ApiProperty({
      description: 'Jurusan mahasiswa',
      type: String,
      example: 'Teknik Informatika',
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 12)
    jurusan: string;
  
    @ApiProperty({
      description: 'Jenis Kelamin mahasiswa',
      enum: Jenis_Kelamin,
      example: 'L',
    })
    @IsEnum(Jenis_Kelamin)
    jenis_kelamin: Jenis_Kelamin;
  }