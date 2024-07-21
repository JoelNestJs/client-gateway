import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ErrorDto } from '.';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger('CustomRpcExceptionFilter');

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errorAny = exception.getError();
    this.logger.error(errorAny);
    if (
      typeof errorAny === 'object'
      && 'status' in errorAny
      && 'message' in errorAny
      && typeof errorAny.status === 'number'
    ) {
      const errorDto: ErrorDto = errorAny as ErrorDto;
      response.status(errorDto.status).json(errorDto);
    } else {
      response.status(400).json(errorAny);
    }
  }
}
