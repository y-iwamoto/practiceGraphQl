import { User } from '../user/user.entity';

export interface GraphQLResponse<T = any> {
  body: {
    data: T;
  };
}

export interface UsersResponse {
  users: User[];
}
