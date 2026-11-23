import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../users/schemas/users.schema.js';

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;
  @Prop({ default: false })
  completed: boolean;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user!: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
