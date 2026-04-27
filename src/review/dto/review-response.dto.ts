import { IsISO8601 } from "class-validator";

export class ReviewResponseDto{
    id: number;
    content: string;
    rating: number;
    status: string;
    @IsISO8601()
    createdAt: string;
    username: string;
}