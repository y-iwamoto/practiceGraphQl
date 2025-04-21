import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Farm } from '@/farm/entities/farm.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { ProduceStock } from '@/produce-stock/entities/produce-stock.entity/produce-stock.entity';
import { Order } from '@/order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          synchronize: configService.get<string>('DB_SYNCH') === 'true',
          logging: configService.get<string>('DB_LOG') === 'true',
          entities: [User, Farm, ProduceItem, ProduceStock, Order],
          migrations: ['src/migrations/*{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DbModule { }
