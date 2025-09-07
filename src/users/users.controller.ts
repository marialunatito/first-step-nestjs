import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from 'env.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  findUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }
}
