import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @Length(2, 55)
  firstName: string;

  @Field(() => String)
  @Length(2, 55)
  lastName: string;
}
