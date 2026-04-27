import { Controller, Get, Param } from '@nestjs/common';
import { HardwareService } from './hardware.service';

@Controller('hardwares')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}
  @Get()
  findAll() {
    return this.hardwareService.findAllHardware();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hardwareService.findOneHardware(+id);
  }
}
