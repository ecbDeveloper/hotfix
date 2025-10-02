import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { db } from './config/database.config';
import { SnakeToCamelInterceptor } from './common/interceptors/snake-to-camel.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new SnakeToCamelInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  db.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.error(`Unable to connect to DB: ${err}`);
    });

  await app.listen(process.env.PORT ?? 3030);
}
bootstrap();
