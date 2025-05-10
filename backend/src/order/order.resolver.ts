import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { User } from '@/user/user.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Role } from '@/auth/enum/role.enum';
import { Roles } from '@/auth/decorators/roles.decorator';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) { }

  @Query(() => [Order])
  @UseGuards(RolesGuard)
  @Roles(Role.Buyer, Role.Admin)
  async orders(
    @Args('pagination', { type: () => PaginationArgs })
    pagination: PaginationArgs,
    @CurrentUser() currentUser: User,
  ) {
    return this.orderService.findAllByFarmId(currentUser.id, pagination);
  }

  @Mutation(() => Order)
  @UseGuards(RolesGuard)
  @Roles(Role.Buyer, Role.Admin)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() currentUser: User,
  ) {
    try {
      return this.orderService.create(createOrderInput, currentUser);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('注文処理中に問題が発生しました');
    }
  }
}
