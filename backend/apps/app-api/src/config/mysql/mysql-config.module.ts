import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfiguration from './mysql-configuration';
import { MySQLConfigService } from './mysql-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mysqlConfiguration],
    }),
  ],
  providers: [ConfigService, MySQLConfigService],
  exports: [ConfigService, MySQLConfigService],
})
export class MySqlConfigModule {}
