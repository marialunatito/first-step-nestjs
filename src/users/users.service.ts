import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

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
      // create do not save in DB but execute hooks
      const newUser = this.usersRepository.create(body);
      // yes save in DB
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(`Error creating user ${(error as Error).message}`);
    }
  }

  delete(id: User['id']) {
    return this.usersRepository.delete({ id });
  }

  async update(id: User['id'], body: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['profile'],
      });

      if (!user) {
        throw new NotFoundException(`User ${id} not found`);
      }

      const userUpdate = this.usersRepository.merge(user, body);

      const savedUser = await this.usersRepository.save(userUpdate);
      return savedUser;
    } catch {
      throw new BadRequestException(`Error update user`);
    }
  }

  async getProfileByUserId(id: User['id']) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user.profile;
  }

  async getPostsByUserId(id: User['id']) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user.posts;
  }

  getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
