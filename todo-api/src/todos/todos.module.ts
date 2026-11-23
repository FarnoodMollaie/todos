import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TodosController } from './todos.controller.js';
import { TodosService } from './todos.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema.js';
import { LoggerMiddleware } from '../common/middleware/logger.middleware.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
    ]),
    AuthModule,
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TodosController);
  }
}