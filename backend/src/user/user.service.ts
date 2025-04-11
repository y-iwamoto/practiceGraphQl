import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) { }

  async findAll(): Promise<User[]> {
    return this.dataSource.getRepository(User).find();
  }
} 