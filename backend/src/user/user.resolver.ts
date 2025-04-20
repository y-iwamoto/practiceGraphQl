import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from '@/user/dto/create-user.input';
import {
  ConflictException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { GraphQLResolveInfo, Kind } from 'graphql';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/auth/enum/role.enum';
import { RolesGuard } from '@/auth/guards/roles.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  async users(@Info() info: GraphQLResolveInfo) {
    const selections = info.fieldNodes[0].selectionSet?.selections;
    const hasFarms = selections?.some(
      (selection) =>
        selection.kind === Kind.FIELD && selection.name.value === 'farms',
    );

    const relations = hasFarms ? { farms: true } : {};
    return this.userService.findAll(relations);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const isEmailExists = await this.userService.checkEmail(
      createUserInput.email,
    );
    if (isEmailExists) {
      throw new ConflictException(
        '入力されたメールアドレスのアカウントが既に存在する可能性があります',
      );
    }

    try {
      return this.userService.create(createUserInput);
    } catch (error) {
      console.error('User creation failed:', error);
      throw new InternalServerErrorException('ユーザーの作成に失敗しました');
    }
  }
}
