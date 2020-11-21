import { INestApplication } from '@nestjs/common';
import bodyParser from 'body-parser';
import compression from 'compression';
import config from 'config';

export interface IApiConfig {
  host: string;
  port: number;
  prefix: string;
}

export const apiConfig: IApiConfig = config.get('server');

export const apiServer = (app: INestApplication) => {
  app.setGlobalPrefix(apiConfig.prefix);
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
  app.use(compression());
  app.enableCors();
};
