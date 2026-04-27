import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @IsOptional()
    @IsString()
    @MinLength(3)
    content?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
  rating?: number;
}
