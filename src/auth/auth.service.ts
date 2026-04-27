import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}
  async register(username: string, password: string, email: string){
    const existingUsername = await this.userService.findByUsername(username).catch(() => null);
    if (existingUsername){
      throw new UnauthorizedException("Inscription impossible");
    }
    const existingEmail = await this.userService.findByEmail(email).catch(() => null);
  if (existingEmail) {
    throw new UnauthorizedException('Inscription impossible');
  }
    return this.userService.create(username, password, email);
}
  async login(username: string, password: string) {
  const user = await this.userService.findForAuth(username);

  if (!user || !(await bcrypt.compare(password, user.password)) && !user.email) {
    throw new UnauthorizedException('Identifiants invalide');
  }
  const payload = {
    sub: user.id,
    username: user.username,
    email: user.email,
  };
  return {
    access: this.jwtService.sign(payload, {expiresIn:'1d'}),
    refresh: this.jwtService.sign(payload, { expiresIn: '7d' }),
  };
}
}


