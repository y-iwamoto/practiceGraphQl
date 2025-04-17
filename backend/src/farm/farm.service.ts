import { Injectable } from '@nestjs/common';
import { CreateFarmInput } from './dto/create-farm.input';
import { Farm } from '@/farm/entities/farm.entity';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { UserService } from '@/user/user.service';

@Injectable()
export class FarmService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
  ) { }

  async findAll(relations: FindOptionsRelations<Farm>): Promise<Farm[]> {
    return this.dataSource.getRepository(Farm).find({
      relations,
    });
  }

  async findOne(id: number): Promise<Farm | null> {
    return this.dataSource.getRepository(Farm).findOne({
      where: { id },
    });
  }

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
