import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceResponseDto } from './dto/service-response.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService){}

  async findAllService() : Promise<ServiceResponseDto[]>{
    const service = await this.prisma.service.findMany({where:{is_active: true},
    select:{
            id: true,
            name: true,
            description:true,
            price: true,
            icon: true,
        }}
    )
    return service.map(s=>({
        ...s,
        id:Number(s.id),
        name:s.name,
        description:s.description,
        price:s.price,
        icon:s.icon,
    }))
  }

  async findOneService(id: number): Promise<ServiceResponseDto> {
    const result = await  this.prisma.service.findUnique({where:{id, is_active:true},
    select:{
        id: true,
        name: true,
        description:true,
        price: true,
        icon: true,
    }});
    if (!result) {
        throw new NotFoundException(`Service avec l'ID ${id} non trouvé ou inactif`);
  }
    return {
        id: Number(result.id),
        name: result.name,
        description: result.description,
        price: result.price,
        icon: result.icon,
    };
}
}
