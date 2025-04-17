import { BaseWithFarmIdInput } from '@/auth/dto/BaseWithFarmIdInput';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateProduceItemInput extends BaseWithFarmIdInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '商品名は必須です' })
  @Length(1, 100, { message: '商品名は1文字以上100文字以下で入力してください' })
  name: string;

}
