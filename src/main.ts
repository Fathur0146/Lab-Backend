import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule  } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())

  app.enableCors({
    origin : "*"
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform : true
    }))

  // Konfigurasi Swagger
  const config = new DocumentBuilder()
    .setTitle('Lab Backend')
    .setDescription('Fathur - 105841113322')
    .setVersion('1.0')
    .addTag('BelajarBackend')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
