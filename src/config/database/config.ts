import { registerAs } from '@nestjs/config';
import { extractStringEnvVar } from '../../common/environment/utils';

export default registerAs('pg', () => ({
  // env: extractStringEnvVar('DB_ENV'),
  host: extractStringEnvVar('DB_HOST'),
  port: extractStringEnvVar('DB_PORT'),
  name: extractStringEnvVar('DB_NAME'),
  user: extractStringEnvVar('DB_USER'),
  password: extractStringEnvVar('DB_PASSWORD'),
  // runMigrations: extractStringEnvVar('RUN_MIGRATIONS'),
}));
