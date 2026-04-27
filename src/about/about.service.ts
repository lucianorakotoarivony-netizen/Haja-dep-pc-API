import { Injectable, NotFoundException } from '@nestjs/common';
import { AboutResponseDto } from './dto/about-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AboutService {
  constructor(private prisma : PrismaService){}
  async getAbout(): Promise<AboutResponseDto>{
    let about = await this.prisma.about.findFirst();
    if (!about){
      throw new NotFoundException("Aucune Section A propos trouvé")
    }
    console.log(about.image_url)
    return {
      id: Number(about.id),
      title: about.title,
      content: about.content,
      image: about.image_url
    }
  }
}
