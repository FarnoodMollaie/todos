import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>('PORT') ?? '3000');

  await app.listen(port);
}
await bootstrap();
