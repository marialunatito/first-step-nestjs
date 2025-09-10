import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: User['id']) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async create(body: CreateUserDto) {
    try {
      return await this.usersRepository.save(body).catch();
    } catch {
      throw new BadRequestException(`Error creating user`);
    }
  }

  delete(id: User['id']) {
    return this.usersRepository.delete({ id });
  }

  async update(id: User['id'], body: Partial<User>) {
    const userPreload = await this.usersRepository.preload({ id, ...body });
    if (!userPreload) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return this.usersRepository.save(userPreload);
  }
}
