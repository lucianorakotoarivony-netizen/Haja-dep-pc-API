import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { InternalUserDto } from './dto/internal-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}
  async findByUsername(username:string): Promise<UserResponseDto>{
    const user = await this.prisma.user.findUnique({where:{ username }});
    if (!user){
      throw new NotFoundException("Identifiants invalide")
    };
    return {
      id:Number(user.id),
      username:user.username,
      email:user.email,

    }
  }
  async findByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Identifiants invalide');
    }
    return {
      id: Number(user.id),
      username: user.username,
      email: user.email,
    };
  }
  async findForAuth(username: string): Promise<InternalUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        password: true,
        username: true,
        email: true,
      },
    });
    if (!user){
      throw new NotFoundException("Indentifiants invalide")
    };
    return {
      id: Number(user.id),
      password: user.password,
      username: user.username,
      email: user.email,

    };
  }
  async create(username: string, password: string, email: string): Promise<UserResponseDto> {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hash,
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return {
      id: Number(user.id),
      username: user.username,
      email: user.email,
    };
  }
}
