import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/users.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(email: string, passwordHash: string) {
    return await this.userModel.create({
      email,
      passwordHash,
    });
  }
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
}
