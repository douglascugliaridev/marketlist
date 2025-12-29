import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '@marketlist/core';

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
    catch(exception: DomainError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response
            .status(exception.getStatusCode())
            .json({
                statusCode: exception.getStatusCode(),
                message: exception.message,
                error: exception.name,
            });
    }
}

