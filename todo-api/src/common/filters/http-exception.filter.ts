import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttpException
      ? exception.getResponse()
      : null;

    const message =
      typeof errorResponse === 'object' &&
      errorResponse !== null &&
      'message' in errorResponse
        ? errorResponse.message
        : isHttpException
          ? exception.message
          : 'Internal server error';

    if (!isHttpException) {
      console.error(exception);
    }

    response.status(statusCode).json({
      isSuccess: false,
      statusCode,
      message,
      data: null,
    });
  }
}