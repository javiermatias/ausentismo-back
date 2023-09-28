/* import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from 'src/users/entities/role.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Role);
    await repository.insert([
      {
        roleName: 'Caleb',
        description: 'Barrows',
      },
    ]);
  }
} */
