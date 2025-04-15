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
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '郵便番号は必須です' })
  @Length(7, 7, { message: '郵便番号は7桁で入力してください' })
  postalCode: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '都道府県は必須です' })
  prefecture: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '市区町村は必須です' })
  city: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: '住所は必須です' })
  restAddress: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  building: string;

  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  ownerId: number;
}
