import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DriverModule } from './models/driver/driver.module';
import { FactoryModule } from './models/factory/factory.module';
import { LaunchModule } from './models/launch/launch.module';
import { OrdersModule } from './models/orders/orders.module';
import { PaymentsModule } from './models/payments/payments.module';
import { PetrolPumpModule } from './models/petrol-pump/petrol-pump.module';
import { StoreModule } from './models/store/store.module';
import { TruckModule } from './models/truck/truck.module';
import { UserProfileModule } from './models/user-profile/user-profile.module';
import { WarhaModule } from './models/warha/warha.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './models/cron-job/cron-job.service';
import { ImagesModule } from './models/images/images.module';
import * as dotenv from 'dotenv'
import { MonthlyBillModule } from './models/monthly-bill/monthly-bill.module';
dotenv.config()
@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.ENV_Host,
      port: 5432,
      username: process.env.ENV_User,
      password: process.env.ENV_Password,
      database: process.env.ENV_DbName,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // entities: ['./modules/**/*.entity{.ts}'],
      // entities: [__dirname + '/src/modules/**/entities/*.entity.ts'],
      // entities: [User],
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      }

    }),
    // PostgreSqlConfigModule,
    MonthlyBillModule,
    ImagesModule,
    WarhaModule,
    TruckModule,
    DriverModule,
    FactoryModule,
    LaunchModule,
    OrdersModule,
    PaymentsModule,
    PetrolPumpModule,
    StoreModule,
    UserProfileModule,
  ],
  controllers: [AppController],
  // providers: [AppService],
  providers: [CronJobService],
})
export class AppModule { }
