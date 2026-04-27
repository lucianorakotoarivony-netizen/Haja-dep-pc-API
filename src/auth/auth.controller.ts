import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { verifyHcaptcha } from 'src/utils/verify-captcha';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({default:{ttl:360000, limit:5}})
  @Post('register')
  async register(@Body() body:{username: string, password: string, email: string, captcha: string, honeypot: string}){
    const isValid = await verifyHcaptcha(body.captcha);
    if (body.honeypot){
      throw new UnauthorizedException('bot détecté');
    }
    if (!isValid){
      throw new UnauthorizedException('captcha invalide');
    }
    return await this.authService.register(body.username, body.password, body.email)
  }
  @Throttle({default:{ttl:60000, limit:10}})
  @Post('login')
  async login(@Body() body:{username:string, password: string, captcha: string, honeypot: string}){
    const isValid = await verifyHcaptcha(body.captcha);
    if (body.honeypot){
      throw new UnauthorizedException('bot détecté');
    }
    if (!isValid){
      throw new UnauthorizedException('captcha invalide');
    }
    return await this.authService.login(body.username, body.password);
  }
}
