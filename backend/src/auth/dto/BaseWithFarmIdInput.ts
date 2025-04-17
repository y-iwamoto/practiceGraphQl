import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

@InputType()
export class BaseWithFarmIdInput {
  @Field(() => Int)
  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsInt({ message: '農場IDは数値で入力してください' })
  @Min(1, { message: '農場IDは1以上の数値で入力してください' })
  farmId: number;
}
