import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class CreateFarmInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '農場名は必須です' })
  @Length(1, 100, { message: '農場名は1文字以上100文字以下で入力してください' })
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '郵便番号は必須です' })
  @Length(7, 7, { message: '郵便番号は7桁で入力してください' })
  postalCode: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '都道府県は必須です' })
  @Length(1, 20, { message: '都道府県は1文字以上20文字以下で入力してください' })
  prefecture: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '市区町村は必須です' })
  @Length(1, 50, { message: '市区町村は1文字以上50文字以下で入力してください' })
  city: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '住所は必須です' })
  @Length(1, 100, { message: '住所は1文字以上100文字以下で入力してください' })
  restAddress: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Length(0, 100, { message: '建物名は100文字以下で入力してください' })
  building: string;

  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  ownerId: number;
}
