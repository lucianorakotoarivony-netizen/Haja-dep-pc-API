import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocialNetworkResponseDto } from './dto/social-network-response.dto';

@Injectable()
export class SocialNetworkService {
  constructor(private prisma: PrismaService){}

  async getAllSocialNetwork(): Promise<SocialNetworkResponseDto[]> {
    const socialNetwork = await this.prisma.socialNetwork.findMany({where:{is_active:true},
    select:{
        id:true,
        name:true,
        link:true,
        icon:true
      }}
    );
    if(!socialNetwork){
      throw new NotFoundException("Aucun réseaux sociaux trouvé. Ce mec vit dans une cave");
    }
    return socialNetwork.map(s=>({
      id:Number(s.id),
      name: s.name,
      link: s.link,
      icon:s.icon
    }))
  }
}