import { Injectable } from '@nestjs/common';
import { IUUIDProvider } from '@marketlist/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UUIDAdapter implements IUUIDProvider {
    generate(): string {
        return uuidv4();
    }
}
