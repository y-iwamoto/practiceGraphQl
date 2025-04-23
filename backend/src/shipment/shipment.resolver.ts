import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { Shipment } from './entities/shipment.entity';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/auth/enum/role.enum';
import { GraphQLError } from 'graphql';
import { UpdateShipmentInput } from '@/shipment/dto/update-shipment.input';

@Resolver(() => Shipment)
export class ShipmentResolver {
  constructor(private readonly shipmentService: ShipmentService) { }

  @UseGuards(RolesGuard)
  @Roles(Role.Farmer, Role.Admin)
  @Mutation(() => Shipment)
  createShipment(
    @Args('createShipmentInput') createShipmentInput: CreateShipmentInput,
  ) {
    try {
      return this.shipmentService.create(createShipmentInput);
    } catch (error: unknown) {
      if (error instanceof GraphQLError) {
        throw new GraphQLError('出荷の作成に失敗しました', {
          extensions: {
            ...error.extensions,
            code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          },
        });
      }
      throw error;
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Farmer, Role.Admin)
  @Mutation(() => Shipment)
  updateShipment(
    @Args('updateShipmentInput') updateShipmentInput: UpdateShipmentInput,
  ) {
    try {
      return this.shipmentService.update(updateShipmentInput);
    } catch (error: unknown) {
      if (error instanceof GraphQLError) {
        throw new GraphQLError('出荷の更新に失敗しました', {
          extensions: {
            ...error.extensions,
            code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          },
        });
      }
      throw error;
    }
  }
}
