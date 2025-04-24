import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DbModule } from './configs/db.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserModule } from '@/user/user.module';
import { FarmModule } from './farm/farm.module';
import { ProduceItemModule } from './produce-item/produce-item.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from '@/auth/auth.middleware';
import { Request } from 'express';
import { ProduceStockModule } from './produce-stock/produce-stock.module';
import { OrderModule } from './order/order.module';
import { ShipmentModule } from './shipment/shipment.module';
// 明示的にroleのモジュールを定義してgraphqlで使用できるようにする
import '@/auth/graphql/role.graphql';
import '@/shipment/graphql/shipment-status.graphql';
import '@/order/graphql/order-status.graphql';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }: { req: Request }) => ({
        currentUser: req.currentUser,
      }),
    }),
    DbModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCH: Joi.string().default('false'),
        DB_LOG: Joi.string().default('false'),
        NAMESPACE: Joi.string().required(),
      }),
      validationOptions: { abortEarly: true },
      isGlobal: true,
    }),
    UserModule,
    FarmModule,
    ProduceItemModule,
    AuthModule,
    ProduceStockModule,
    OrderModule,
    ShipmentModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'graphql', method: RequestMethod.GET })
      .forRoutes('graphql');
  }
}
