import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard, OptionalJwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn:"1d"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, OptionalJwtAuthGuard],
  exports:[AuthService, JwtAuthGuard, JwtStrategy, OptionalJwtAuthGuard]
})
export class AuthModule {}
