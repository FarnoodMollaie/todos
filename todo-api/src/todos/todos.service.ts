import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema.js';
import { Model } from 'mongoose';
import { CreateToDo } from './dtos/create-todo.dto.js';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<Todo>,
  ) {}
  async findAll(userId: string) {
    return await this.todoModel.find({ user: userId }).exec();
  }
  async findOne(id: string, userId: string) {
    const foundTodo = await this.todoModel
      .findOne({ _id: id, user: userId })
      .exec();
    if (!foundTodo) {
      throw new NotFoundException({
        message: 'Todo not found',
        error: 'Not Found',
        statusCode: 404,
      });
    }
    return foundTodo;
  }
  async create(body: CreateToDo, userId: string) {
    const newTodo = await this.todoModel.create({ ...body, user: userId });
    return newTodo;
  }
  async update(
    id: string,
    body: { title?: string; completed?: boolean },
    userId: string,
  ) {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id, user: userId },
      body,
      {
        new: true,
      },
    );
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }
  async delete(id: string, userId: string) {
    const deletedTodo = await this.todoModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedTodo) {
      throw new NotFoundException('Todo not found');
    }

    return { message: 'Todo deleted successfully' };
  }
}
