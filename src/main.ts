import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter: httAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httAdapter));

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();

// DB:
// https://console.neon.tech/app/projects/ancient-unit-00575750/branches/br-long-moon-a2vvfvaq/tables
// course:
// https://www.youtube.com/watch?v=8_X0nSrzrCw
