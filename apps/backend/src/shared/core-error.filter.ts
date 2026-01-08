import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '@marketlist/core';

@Catch(DomainError)
export class CoreErrorFilter implements ExceptionFilter {
    private readonly statusCodeMap = new Map<string, number>([
        // Market exceptions
        ['MarketValidationException', HttpStatus.BAD_REQUEST],
        ['MarketNotFoundException', HttpStatus.NOT_FOUND],
        ['MarketAlreadyExistsException', HttpStatus.CONFLICT],
        ['MarketNameValidationException', HttpStatus.BAD_REQUEST],
        ['MarketIdValidationException', HttpStatus.BAD_REQUEST],

        // Product exceptions
        ['ProductValidationException', HttpStatus.BAD_REQUEST],
        ['ProductNotFoundException', HttpStatus.NOT_FOUND],
        ['ProductBrandValidationException', HttpStatus.BAD_REQUEST],
        ['ProductIdValidationException', HttpStatus.BAD_REQUEST],
        ['ProductNameValidationException', HttpStatus.BAD_REQUEST],
        ['ProductUserIdValidationException', HttpStatus.BAD_REQUEST],

        // ProductItem exceptions
        ['ProductItemValidationException', HttpStatus.BAD_REQUEST],
        ['ProductItemNotFoundException', HttpStatus.NOT_FOUND],
        ['ProductItemAlreadyExistsException', HttpStatus.CONFLICT],
        ['ProductItemIdValidationException', HttpStatus.BAD_REQUEST],
        ['ProductItemPurchaseIdValidationException', HttpStatus.BAD_REQUEST],
        ['ProductItemAmountValidationException', HttpStatus.BAD_REQUEST],
        ['ProductItemPriceValidationException', HttpStatus.BAD_REQUEST],

        // Purchase exceptions
        ['PurchaseValidationException', HttpStatus.BAD_REQUEST],
        ['PurchaseNotFoundException', HttpStatus.NOT_FOUND],
        ['PurchaseIdValidationException', HttpStatus.BAD_REQUEST],
        ['PurchaseNameValidationException', HttpStatus.BAD_REQUEST],

        // User exceptions
        ['UserValidationException', HttpStatus.BAD_REQUEST],
        ['UserNotFoundException', HttpStatus.NOT_FOUND],
        ['UserAlreadyExistsException', HttpStatus.CONFLICT],
        ['UserAuthenticationException', HttpStatus.UNAUTHORIZED],
        ['UserIdValidationException', HttpStatus.BAD_REQUEST],
        ['UserNameValidationException', HttpStatus.BAD_REQUEST],
        ['UserEmailValidationException', HttpStatus.BAD_REQUEST],
        ['UserPasswordValidationException', HttpStatus.BAD_REQUEST],
        ['UserPasswordHashValidationException', HttpStatus.BAD_REQUEST],
    ]);

    catch(exception: DomainError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const statusCode = this.statusCodeMap.get(exception.name) || HttpStatus.INTERNAL_SERVER_ERROR;

        response
            .status(statusCode)
            .json({
                statusCode,
                message: exception.message,
                error: exception.name,
            });
    }
}
