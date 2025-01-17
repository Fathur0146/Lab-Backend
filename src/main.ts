import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule  } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const config = new DocumentBuilder()
//   .setTitle('Lab Backend')
//   .setDescription('Fathur - 105841113322')
//   .setVersion('1.0')
//   .addTag('BelajarBackend')
//   .build();
// const documentFactory = () => SwaggerModule.createDocument(app, config);

// SwaggerModule.setup('api', app, documentFactory);

//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
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

  // Aktifkan CORS
  app.enableCors({
    origin: 'http://localhost:5500', // URL frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
