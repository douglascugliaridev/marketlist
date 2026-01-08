import { IUserRepository } from "../provider/IUserRepository";
import { UserValidationService } from "../service/UserValidationService";
import { UserId } from "../model/value-objects/UserId";

export type GetUserByIdOutput = {
    id: string;
    name: string;
    email: string;
};

export class GetUserByIdUseCase {
    constructor(
        private readonly userRepository: IUserRepository
    ) { }

    async execute(userId: string): Promise<GetUserByIdOutput> {
        const id = UserId.create(userId);

        const user = await this.userRepository.findById(id.getValue());

        const validatedUser = UserValidationService.validateUserExists(user);

        return {
            id: validatedUser.getId(),
            name: validatedUser.getName(),
            email: validatedUser.getEmail(),
        };
    }
}
