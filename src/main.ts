import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { db } from './config/database.config';
import { SnakeToCamelInterceptor } from './common/interceptors/snake-to-camel.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('HotFix')
    .setDescription('A platform connecting developers with expert reviewers for fast and reliable code corrections like Uber, but for code.')
    .setVersion('1.0')
    .build()
  const docomentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, docomentFactory())

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
