import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from '@/user/dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const isEmailExists = await this.userService.checkEmail(
      createUserInput.email,
    );
    if (isEmailExists) {
      throw new Error(
        '入力されたメールアドレスのアカウントが既に存在する可能性があります',
      );
    }

    return this.userService.create(createUserInput);
  }
}
