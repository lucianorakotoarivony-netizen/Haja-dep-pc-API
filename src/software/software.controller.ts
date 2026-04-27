import { Controller, Get, Param } from '@nestjs/common';
import { SoftwareService } from './software.service';

@Controller('softwares')
export class SoftwareController {
  constructor(private readonly softwareService: SoftwareService) {}

  @Get()
  findAll() {
    return this.softwareService.findAllSoftware();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.softwareService.findOneSoftware(+id);
  }
}
