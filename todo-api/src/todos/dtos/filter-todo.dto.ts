import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum TodoStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export class FilterTodoDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  @IsString()
  search?: string;
}