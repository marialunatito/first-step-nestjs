import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User not Unauthorized`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(`User not Unauthorized`);
    }

    return user;
  }
}
