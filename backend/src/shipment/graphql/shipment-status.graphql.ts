import { ShipmentStatus } from '@/shipment/enum/shipment-status.enum';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(ShipmentStatus, {
  name: 'ShipmentStatus',
  description: '発送ステータス',
});
