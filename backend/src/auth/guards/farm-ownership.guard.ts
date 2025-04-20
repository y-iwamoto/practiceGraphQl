import { BaseWithFarmIdInput } from '@/auth/dto/BaseWithFarmIdInput';
import { IContext } from '@/auth/types/context.interface';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

type InputWithFarmId = { farmId: number };

@Injectable()
export class FarmOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs<{
      baseWithFarmIdInput: BaseWithFarmIdInput;
    }>();
    const gqlContext = ctx.getContext<IContext>();
    const currentUser = gqlContext.currentUser;
    const input = Object.values(args).find(
      (arg): arg is InputWithFarmId =>
        typeof arg === 'object' && arg !== null && 'farmId' in arg,
    );

    if (!input) {
      throw new BadRequestException('農場IDが指定されていません');
    }

    if (!currentUser) {
      throw new UnauthorizedException('認証されていません');
    }

    if (!currentUser.farms || currentUser.farms.length === 0) {
      throw new ForbiddenException('所有している農場がありません');
    }

    const isFarmOwner = currentUser.farms?.find(
      (farm) => farm.id === input.farmId,
    );

    if (!isFarmOwner) {
      throw new ForbiddenException('農場の所有者ではありません');
    }
    return true;
  }
}
