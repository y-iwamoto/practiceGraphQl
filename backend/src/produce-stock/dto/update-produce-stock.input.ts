import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseWithFarmIdInput } from '@/auth/dto/BaseWithFarmIdInput';
import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

@InputType()
export class UpdateProduceStockInput extends BaseWithFarmIdInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  id: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0, { message: '在庫は0以上で入力してください' })
  amount: number;
}
