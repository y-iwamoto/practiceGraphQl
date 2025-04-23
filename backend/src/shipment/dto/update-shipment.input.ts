import { ShipmentStatus } from '@/shipment/enum/shipment-status.enum';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateShipmentInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  id: number;

  @Field(() => ShipmentStatus)
  @IsNotEmpty()
  @IsEnum(ShipmentStatus)
  status: ShipmentStatus;
}
