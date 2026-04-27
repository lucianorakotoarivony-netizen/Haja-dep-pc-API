import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home-response.dto';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService){}
  async getHome():Promise<HomeResponseDto>{
    let home = await this.prisma.home.findFirst();
    if (!home)
      throw new NotFoundException("Configuration de l'accueil non trouvée.");
    return {
    id: Number(home.id),
    siteName: home.site_name,
    ownerName: home.owner_name,
    primaryColor: home.primary_color
  };
  }
}
