import { OrderStatus } from '@/order/enum/order-status.enum';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: '注文ステータス',
});
