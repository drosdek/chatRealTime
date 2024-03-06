import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'apollo-server-express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException && exception.getStatus() === HttpStatus.BAD_REQUEST) {
      if (exception.getResponse() instanceof Array && exception.getResponse()[0] instanceof ValidationError) {
        const validationErrors = exception.getResponse() as ValidationError[];
        const messages = validationErrors.map(error => Object.values(error.constraints));
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Erro de validação',
          errors: messages,
        });
        return;
      }
    }

    const status = exception.getStatus();
    const responseBody = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: responseBody['message'] || null,
    });
  }
}
