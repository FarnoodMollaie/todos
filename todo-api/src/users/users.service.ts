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
  async saveRefreshTokenHash(userId: string, hash: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      refreshTokenHash: hash,
    });
  }

  async rotateRefreshTokenHash(
    userId: string,
    oldHash: string,
    newHash: string,
  ) {
    return this.userModel.findOneAndUpdate(
      {
        _id: userId,
        refreshTokenHash: oldHash,
      },
      {
        $set: { refreshTokenHash: newHash },
      },
      { new: true },
    );
  }
  findById(id: string) {
    return this.userModel
      .findById(id)
      .select('_id email createdAt updatedAt')
      .exec();
  }
  async revokeRefreshTokenHash(userId: string, tokenHash: string) {
    return this.userModel.findOneAndUpdate(
      {
        _id: userId,
        refreshTokenHash: tokenHash,
      },
      {
        $set: { refreshTokenHash: null },
      },
    );
  }
}
