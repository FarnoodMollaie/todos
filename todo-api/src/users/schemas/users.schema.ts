import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email!: string;
  @Prop({ required: true })
  passwordHash: string;
  @Prop({ type: String, default: null, select: false })
  refreshTokenHash?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
