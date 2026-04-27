import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req:any, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(req.user.id, createReviewDto);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  async findAll(@Request() req:any) {
    const userId = req.user?.id;
    return this.reviewService.findAllReviews(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update')
  async update(@Param('id') id: string, @Request() req:any, @Body() updateReviewDto: UpdateReviewDto) {
    const userId = req.user?.id;
    return this.reviewService.updateReview(userId, +id, updateReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Request() req:any) {
    const userId = req.user?.id;
    return this.reviewService.deleteReview(userId,+id);
  }
}
