import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MovieRate docs')
    .setDescription('Swagger docs for MovieRate')
    .setVersion('1.0')
    .addTag('movies')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, doc);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
