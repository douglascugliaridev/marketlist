
export interface IUserPasswordRepository {
    save(password: any): Promise<void>;
    findByUserId(userId: string): Promise<any | null>;
}
