import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { DataSource } from 'typeorm';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly dataSource: DataSource) { }

  @Query(() => [User])
  async users() {
    return this.dataSource.getRepository(User).find();
  }
}
