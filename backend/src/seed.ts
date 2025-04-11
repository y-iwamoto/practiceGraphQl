import { User } from './user/user.entity';
import dataSource from './configs/migrations-local.config';
import { UserSeedService } from './seeds/services/user.seed.service';

async function seed() {
  const connection = await dataSource.initialize();
  const queryRunner = connection.createQueryRunner();
  const userRepository = queryRunner.manager.getRepository(User);
  const userSeedService = new UserSeedService(userRepository);

  try {
    // トランザクションを開始
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await userSeedService.seed();

    // トランザクションをコミット
    await queryRunner.commitTransaction();
    console.log('Seeding completed successfully');
  } catch (error) {
    // エラーが発生した場合はロールバック
    await queryRunner.rollbackTransaction();
    console.error('Seeding failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
  } finally {
    // クエリランナーを解放
    await queryRunner.release();
    // 接続を破棄
    await connection.destroy();
  }
}

seed(); 