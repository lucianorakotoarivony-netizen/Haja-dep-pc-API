import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SoftwareResponseDto } from './dto/software-response.dto';


@Injectable()
export class SoftwareService {
  constructor(private prisma : PrismaService){}
  async findAllSoftware():Promise<SoftwareResponseDto[]> {
    const software = await this.prisma.core_software.findMany({where:{is_active: true},
    select:{
      id:true,
      name:true,
      description:true,
      icon:true,
      image_url:true,
      version:true,
      price:true
    }});
    return software.map(s=>({
      ...s,
      id: Number(s.id),
      name:s.name,
      description:s.description,
      icon:s.icon,
      version:s.version,
      price:s.price,
      image:s.image_url
    }));
  }

  async findOneSoftware(Softid: number):Promise<SoftwareResponseDto> {
    const software = await this.prisma.core_software.findUnique({where:{id:Softid, is_active:true},
    select:{
      id:true,
      name:true,
      description:true,
      icon:true,
      image_url:true,
      version:true,
      price:true
    }});
    if(!software){
      throw new NotFoundException("Aucun logiciel trouvé");
    }
    return {
      id:Number(software.id),
      name:software.name,
      description:software.description,
      icon:software.icon,
      image:software.image_url,
      version:software.version,
      price:software.price
    }
  }

}
