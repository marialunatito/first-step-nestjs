import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
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
