import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('/api')

  await app.listen(port, () => {
    console.log(`Server has been started on ${port} port!`)
  });
}
bootstrap();
