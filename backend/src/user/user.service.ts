import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from '@/user/dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) { }

  async findAll(): Promise<User[]> {
    return this.dataSource.getRepository(User).find();
  }

  async checkEmail(email: string): Promise<boolean> {
    const isPresent = await this.dataSource.getRepository(User).exists({
      where: { email },
    });
    return isPresent;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.dataSource.getRepository(User).create(createUserInput);
    return this.dataSource.getRepository(User).save(user);
  }
}
