import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class PostgreSqlConfigService {
  constructor(private configService: ConfigService) {}

  get isProduction(): boolean {
    return this.configService.get<string>('pg.env') !== 'local';
  }

  get host(): string {
    return this.configService.get<string>('pg.host');
  }

  get port(): string {
    return this.configService.get<string>('pg.port');
  }

  get name(): string {
    return this.configService.get<string>('pg.name');
  }

  get user(): string {
    return this.configService.get<string>('pg.user');
  }

  get password(): string {
    return this.configService.get<string>('pg.password');
  }

  get runMigrations(): boolean {
    return this.configService.get<boolean>('pg.runMigrations');
  }
}
