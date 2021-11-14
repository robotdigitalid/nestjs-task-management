import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { User } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const { username } = authCredentialDto;
    const password = await bcrypt.hash(authCredentialDto.password, 10);
    const user = this.create({ username, password });
    await this.save(user).catch((error) => {
      if (error.code === '23505')
        throw new ConflictException('Username already exists');
      throw new InternalServerErrorException();
    });
  }
}
