export interface IPaginationParams {
    page?: number;
    limit?: number;
}

export interface IPaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}

export class PaginatedResult<T> implements IPaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };

    constructor(data: T[], page: number, limit: number, total: number) {
        this.data = data;
        const totalPages = Math.ceil(total / limit);
        this.pagination = {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrevious: page > 1
        };
    }
}
