import { IUserRepository } from "../provider/IUserRepository";
import { NotFoundError } from "../../shared/errors/NotFoundError";
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

        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
        };
    }
}
