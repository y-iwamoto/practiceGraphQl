import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, Min, Validate } from 'class-validator';

@InputType()
export class ProduceItemOrderInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: '注文数は1以上で入力してください' })
  amount: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  produceItemId: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  farmId: number;

  @Field(() => [ProduceItemOrderInput])
  @IsArray()
  @IsNotEmpty({ message: '生産品の注文情報を入力してください' })
  @Validate(ProduceItemOrderInput, { each: true })
  @Type(() => ProduceItemOrderInput)
  produceItems: ProduceItemOrderInput[];
}
