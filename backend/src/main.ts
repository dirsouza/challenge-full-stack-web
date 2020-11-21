import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from 'Infrastructure/modules';
import { apiServer, swaggerServer, apiConfig, swaggerConfig } from 'Infrastructure/servers';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  apiServer(app);
  swaggerServer(app);

  const { host, port, prefix: apiPrefix } = apiConfig;
  const { prefix: swaggerPrefix } = swaggerConfig;

  await app.listen(port);

  logger.debug(`Appliation listening on: http://${ host }:${ port }/${ apiPrefix }`);
  logger.debug(`Appliation listening on: http://${ host }:${ port }/${ swaggerPrefix }`);
}
bootstrap();
