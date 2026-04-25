import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mengaktifkan CORS agar Frontend React bisa akses
  app.enableCors(); 

  // Mengaktifkan Global Exception Filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Setup Swagger OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Smart Room Booking API (BFF)')
    .setDescription('API Dokumentasi untuk Web dan Mobile')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger Docs available at: http://localhost:3000/api/docs`);
}
bootstrap();