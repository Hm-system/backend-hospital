import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseObj =
      exception instanceof HttpException
        ? (exception.getResponse() as any)
        : { message: 'Internal server error' };

    this.logger.error(`Error occurred at ${request.url}`, exception as any);

    // Extract single message if it's an array
    const message = Array.isArray(responseObj.message)
      ? responseObj.message[0]
      : responseObj.message;

    // Extract error field from responseObj
    const error =
      responseObj.error || HttpStatus[status] || 'Internal Server Error';

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: error,
      msg: message,
    });
  }
}
