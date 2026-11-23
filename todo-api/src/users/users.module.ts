import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema.js';

@Module({
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
