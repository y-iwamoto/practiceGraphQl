import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateShipmentInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  orderId: number;

}
