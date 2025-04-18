import { Role } from '@/auth/enum/role.enum';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(Role, {
  name: 'Role',
  description: 'ユーザーの権限',
});
