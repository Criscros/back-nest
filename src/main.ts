import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
  console.log('***YOU`R***CONTECTED*********',process.env.MONGO_CONF)
  app.enableCors();
}
bootstrap();
