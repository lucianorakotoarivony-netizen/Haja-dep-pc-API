import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard, OptionalJwtAuthGuard } from './auth/jwt-auth.guard';
import { STATUS_CODES } from 'http';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  Health() {
    return {
      status: 'ok',
    };
  }
  @Get('auth')
  @UseGuards(JwtAuthGuard)
  AuthHealth(){
    return {status:'ok', user:'valid' };
  }
}
