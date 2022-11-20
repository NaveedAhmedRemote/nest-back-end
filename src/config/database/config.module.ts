// import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config';
import { PostgreSqlConfigService } from './config.service';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      // validationSchema: Joi.object({
      //   DB_ENV: Joi.string().valid('local', 'production').default('local'),
      //   DB_HOST: Joi.string().default('127.0.0.1'),
      //   DB_PORT: Joi.string().default('5432'),
      //   DB_NAME: Joi.string().required(),
      //   DB_USER: Joi.string().default('postgres'),
      //   DB_PASSWORD: Joi.string().default('123'),
      //   RUN_MIGRATIONS: Joi.boolean().default(true),
      // }),
    }),
  ],
  providers: [ConfigService, PostgreSqlConfigService],
  exports: [ConfigService, PostgreSqlConfigService],
})
export class PostgreSqlConfigModule {}
