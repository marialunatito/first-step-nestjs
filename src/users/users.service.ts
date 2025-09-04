import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Response, User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'Maria Luna',
      email: 'maria.luna@example.com',
    },
    {
      id: '2',
      name: 'Carmen Lopez',
      email: 'carmen.lopez@example.com',
    },
    {
      id: '3',
      name: 'Vero Cornejo',
      email: 'vero.cornejo@example.com',
    },
  ];

  findAll(): Response {
    const response: Response = {
      message: 'Users found successfully',
    };

    response.data = this.users;

    return response;
  }

  findOne(id: string): Response {
    const result = this.users.find((user) => user.id === id);

    const response: Response = {
      message: 'User found successfully',
    };

    if (!result) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    response.data = result;

    return response;
  }

  create(body: CreateUserDto): Response {
    this.users.push({
      ...body,
      id: randomUUID(),
    });

    return {
      message: 'User created successfully',
    };
  }

  delete(id: string): Response {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(position, 1);

    return {
      message: 'User deleted successfully',
    };
  }

  update(id: string, body: UpdateUserDto): Response {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedUser = {
      ...this.users[position],
      ...body,
    };

    this.users[position] = updatedUser;

    return {
      message: 'User updated successfully',
      data: this.users[position],
    };
  }
}
