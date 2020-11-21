import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from 'Infrastructure/modules';
import { apiServer, swaggerServer, apiConfig, swaggerConfig } from 'Infrastructure/server';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  apiServer(app);
  swaggerServer(app);

  await app.listen(apiConfig.port);

  logger.debug(`Appliation listening on: http://${ apiConfig.host }:${ apiConfig.port }/${ apiConfig.prefix }`);
  logger.debug(`Appliation listening on: http://${ apiConfig.host }:${ apiConfig.port }/${ swaggerConfig.prefix }`);
}
bootstrap();
