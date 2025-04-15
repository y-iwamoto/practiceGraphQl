import { Injectable } from '@nestjs/common';
import { CreateFarmInput } from './dto/create-farm.input';
import { Farm } from '@/farm/entities/farm.entity';
import { DataSource } from 'typeorm';
import { UserService } from '@/user/user.service';

@Injectable()
export class FarmService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
  ) { }

  async create(createFarmInput: CreateFarmInput): Promise<Farm> {
    const user = await this.userService.findOne(createFarmInput.ownerId);
    if (!user) {
      throw new Error('ユーザーが存在しません');
    }

    return this.dataSource.getRepository(Farm).save({
      ...createFarmInput,
      owner: user,
    });
  }

}
