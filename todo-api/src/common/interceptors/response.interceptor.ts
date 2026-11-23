import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        isSuccess: true,
        statusCode: response.statusCode,
        message: 'Success',
        data: data ?? null,
      })),
    );
  }
}
