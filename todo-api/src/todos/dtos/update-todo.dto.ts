import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateToDo {
  @IsBoolean()
  @IsOptional()
  completed: boolean;
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;
}
