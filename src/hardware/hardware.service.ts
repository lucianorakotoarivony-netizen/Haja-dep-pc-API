import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HardwareResponseDto } from './dto/hardware-response.dto';


@Injectable()
export class HardwareService {
  constructor(private prisma: PrismaService){}

  async findAllHardware():Promise<HardwareResponseDto[]> {
    const hardware = await this.prisma.core_hardware.findMany({where:{is_active:true},
    select:{
      id: true,
      name: true,
      price: true,
      description: true,
      icon:true,
      image_url:true,
      warranty:true,
    }})
    return hardware.map(h=>({
      id: Number(h.id),
      name: h.name,
      description: h.description,
      price: h.price,
      icon:h.icon,
      image:h.image_url,
      warranty:h.warranty
    }))
  }

  async findOneHardware(hardId: number): Promise<HardwareResponseDto> {
    const hardware = await this.prisma.core_hardware.findUnique({where:{id: hardId,is_active:true},
    select:{
      id: true,
      name: true,
      price: true,
      description: true,
      icon:true,
      image_url:true,
      warranty:true,
    }})
    if (!hardware){
      throw new NotFoundException("Aucun matériel trouvé")
    }
    return {
      id: Number(hardware.id),
      name: hardware.name,
      price: hardware.price,
      description: hardware.description,
      icon: hardware.icon,
      image: hardware.image_url,
      warranty: hardware.warranty
    }
  }

}
