import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  @Get()
  findAll() {
    return this.serviceService.findAllService();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = await this.serviceService.findOneService(+id);
    if (!service){
      throw new NotFoundException("Service non trouvé")
    }
    return service;
  }

}
