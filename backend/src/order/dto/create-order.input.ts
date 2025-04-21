import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0, { message: '注文数は0以上で入力してください' })
  amount: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  farmId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  produceItemId: number;
}
