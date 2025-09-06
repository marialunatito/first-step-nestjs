import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Env } from 'env.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [ConfigModule.forRoot<Env>()],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
