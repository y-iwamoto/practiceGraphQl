import { User } from '../../user/user.entity';

export interface IContext {
  currentUser: User;
}
