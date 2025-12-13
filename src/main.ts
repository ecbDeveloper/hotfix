import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('HotFix')
    .setDescription('A platform connecting developers with expert reviewers for fast and reliable code corrections like Uber, but for code.')
    .setVersion('1.0')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      methodKey: string
    ) => methodKey
  };
  const docomentFactory = () => SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('docs', app, docomentFactory)

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3030);

}
bootstrap();
