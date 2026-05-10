import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Mengaktifkan CORS agar Frontend React bisa akses
  app.enableCors(); 

   //validasi DTO-agar data yang masuk ke-API tidak kosong atau asal-asalan
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: false,
  }),
);

  // Mengaktifkan Global Exception Filter
 // app.useGlobalFilters(new GlobalExceptionFilter());



  // Setup Swagger OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Smart Room Booking API (BFF)')
    .setDescription('API Dokumentasi untuk Web dan Mobile')
    .setVersion('1.0')
    .addTag('rooms')
    .addTag('bookings')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  //gambar bisa di akses lewat 
  // (http://localhost:3000/uploads/nama-file.jpg)
  app.useStaticAssets(join(__dirname, '..', 'uploads'),{
    prefix: '/uploads/',
  });

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger Docs available at: http://localhost:3000/api-docs`);
}
bootstrap();