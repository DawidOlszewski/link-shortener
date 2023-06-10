import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';

import { NotFoundError, DBError, UniqueViolationError } from 'objection';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(public readonly httpAdapterHost: HttpAdapterHost) {
    super();
  }

  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof UniqueViolationError) {
      this.httpAdapterHost.httpAdapter.reply(
        response,
        {
          type: exception.name,
        },
        HttpStatus.CONFLICT,
      );
    } else if (exception instanceof NotFoundError) {
      this.httpAdapterHost.httpAdapter.reply(
        response,
        {
          type: 'Not Found In DB',
        },
        HttpStatus.NOT_FOUND,
      );
    } else if (exception instanceof DBError) {
      this.httpAdapterHost.httpAdapter.reply(
        response,
        {
          type: exception.name,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    super.catch(exception, host);
  }
}
