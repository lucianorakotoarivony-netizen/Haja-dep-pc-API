import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService){}
  async findAllReviews(userId?:number):Promise<ReviewResponseDto[]>{
    const whereCondition = userId
    ? {
      is_active: true,
      OR:[
        {core_status:'approved'},
        {userId, core_status: 'pending'},
      ],
    }
    :{
      is_active: true,
      core_status: 'approved',
    };

    const reviews = await this.prisma.review.findMany({
      where: whereCondition,
      orderBy:{ createdAt:'desc'},
      select:{
        id:true,
        content: true,
        rating:true,
        core_status:true,
        createdAt:true,
        User:{
          select:{ username:true},
        },
      }
    })
    return reviews.map(r=>({
      id: Number(r.id),
      username: r.User.username,
      content: r.content,
      rating:r.rating,
      status:r.core_status,
      createdAt:r.createdAt.toISOString()
    }))
  }
  async createReview(userId: number, dto: CreateReviewDto): Promise<ReviewResponseDto> {
    const user = await this.prisma.user.findUnique({where:{id:userId, is_active: true}});
    if (!user){
      throw new BadRequestException("Vous n'êtes pas autorisé à poster un avis. Vous pouvez nous contacter pour plus d'informations.")
    }
  const review = await this.prisma.review.create({
    data: {
      content: dto.content,
      rating: dto.rating,
      userId,
    },
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      core_status:true,
      User: {
        select: { username: true },
      },
    },
  });

  return {
    id: Number(review.id),
    content: review.content,
    rating: review.rating,
    status: review.core_status,
    createdAt: review.createdAt.toISOString(),
    username: review.User.username,
  };
}
  async updateReview(userId:number, reviewId:number, dto: UpdateReviewDto): Promise<ReviewResponseDto>{
    const user = await this.prisma.user.findUnique({where:{id:userId, is_active:true}});
    if (!user){
      throw new BadRequestException("Vous n'êtes pas autorisé à modifier cet avis. Vous pouvez nous contacter pour plus d'informations.")
    }
    const existing = await this.prisma.review.findUnique({
      where:{id: reviewId},
      select: {userId: true, core_status:true},
    });
    if(!existing){
      throw new NotFoundException("Avis non trouvé");
    }
    if(Number(existing.userId) !== userId){
      throw new ForbiddenException("Vous ne pouvez modifier que vos propre avis");
    }
    if(existing.core_status !== "pending"){
      throw new BadRequestException("Seuls les avis en attente peuvent être modifiés");
    }
    const review = await this.prisma.review.update({
      where:{id: reviewId},
      data:{
        ...(dto.content && {content: dto.content}),
        ...(dto.rating&& {rating:dto.rating}),
      },
      select:{
        id: true,
        content: true,
        rating: true,
        core_status: true,
        createdAt: true,
        User: {
        select: { username: true },
      },
    },
    });
    return {
    id: Number(review.id),
    content: review.content,
    rating: review.rating,
    status: review.core_status,
    createdAt: review.createdAt.toISOString(),
    username: review.User.username,
  };
  }
  async  deleteReview(userId: number, reviewId: number):Promise<void>{
    const user = await this.prisma.user.findUnique({where: {id:userId, is_active: true}});
    if (!user){
      throw new BadRequestException("Vous n'êtes pas autorisé à supprimer cet avis. Vous pouvez nous contacter pour plus d'informations.")
    }
    const existing = await this.prisma.review.findUnique({
      where:{id: reviewId},
      select:{ userId: true, core_status: true},
    });
    if(!existing){
      throw new NotFoundException("Avis non trouvé");
    }
    if(Number(existing.userId)!==userId){
      throw new ForbiddenException("Vous ne pouvez supprimer que vos propres avis");
    }
    await this.prisma.review.update({
      where:{id:reviewId},
      data:{is_active:false},
    });
  }
}
