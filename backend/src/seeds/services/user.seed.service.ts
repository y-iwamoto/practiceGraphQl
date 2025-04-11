import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { userSeeds } from '../data/user.seed';

export class UserSeedService {
  constructor(private readonly userRepository: Repository<User>) { }

  async seed() {
    for (const userData of userSeeds) {
      try {
        const existingUser = await this.userRepository.findOne({
          where: { email: userData.email },
        });

        if (existingUser) {
          await this.userRepository.update(existingUser.id, userData);
          console.log(`Updated user: ${userData.email}`);
        } else {
          const newUser = this.userRepository.create(userData);
          const savedUser = await this.userRepository.save(newUser);
          console.log(`Created user: ${savedUser.email} with ID: ${savedUser.id}`);
        }
      } catch (error) {
        console.error(`Failed to process user ${userData.email}:`, error);
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack,
          });
        }
        throw error;
      }
    }
  }
} 