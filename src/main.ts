import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //dummy comment1
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
      transform: true,
    }),
  );
  await app.listen(process.env.PORTAPP);
}
bootstrap();

//export default bootstrap;
