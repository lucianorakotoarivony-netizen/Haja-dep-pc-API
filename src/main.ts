import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.setGlobalPrefix("api");
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // 👇 Ne s'active QUE si on n'est pas en prod (pas de FRONTEND_URL)
  if (!process.env.FRONTEND_URL) {
    app.useStaticAssets(join(__dirname, '..', '..', 'media'), {
      prefix: '/media/',
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();