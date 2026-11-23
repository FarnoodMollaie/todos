import { IsString, IsNotEmpty } from 'class-validator';

export class CreateToDo {
  @IsNotEmpty()
  @IsString()
  title: string;
}
