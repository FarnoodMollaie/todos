import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateToDo } from './dtos/create-todo.dto.js';
import { UpdateToDo } from './dtos/update-todo.dto.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get()
  findAll(@CurrentUser('sub') userId: string) {
    return this.todosService.findAll(userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser('sub') userId: string) {
    return this.todosService.findOne(id, userId);
  }
  @Post()
  create(@Body() body: CreateToDo, @CurrentUser('sub') userId: string) {
    return this.todosService.create(body, userId);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateToDo,
    @CurrentUser('sub') userId: string,
  ) {
    return this.todosService.update(id, body, userId);
  }
  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser('sub') userId: string) {
    return this.todosService.delete(id, userId);
  }
}
