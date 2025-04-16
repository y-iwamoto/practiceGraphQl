import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from '@/user/dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) { }

  async findAll(relations: FindOptionsRelations<User>): Promise<User[]> {
    return this.dataSource.getRepository(User).find({
      relations,
    });
  }

  async checkEmail(email: string): Promise<boolean> {
    const isPresent = await this.dataSource.getRepository(User).exists({
      where: { email },
    });
    return isPresent;
  }

  async findOne(id: number): Promise<User | null> {
    return this.dataSource.getRepository(User).findOne({
      where: { id },
    });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.dataSource.getRepository(User).create(createUserInput);
    return this.dataSource.getRepository(User).save(user);
  }
}
