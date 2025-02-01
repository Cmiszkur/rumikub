/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app.module';
import { SessionAdapter } from './modules/events/events.adapter';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform input to the expected types
    whitelist: true, // Strip unknown properties (optional)
    forbidNonWhitelisted: true, // Reject requests with extra properties (optional)
  }));
  const globalPrefix = 'api';
  const jwtService = app.get(JwtService);
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  app.useWebSocketAdapter(new SessionAdapter(jwtService));
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
