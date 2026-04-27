import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { ServiceModule } from './service/service.module';
import { AboutModule } from './about/about.module';
import { SocialNetworkModule } from './social-network/social-network.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { HardwareModule } from './hardware/hardware.module';
import { SoftwareModule } from './software/software.module';
import { ThrottlerModule } from '@nestjs/throttler'
@Module({
  imports: [
    ThrottlerModule.forRoot([{ttl:60000, limit:10}]),
    PrismaModule, HomeModule, ContactModule, AboutModule, SocialNetworkModule, AuthModule, UserModule, ServiceModule, ReviewModule, HardwareModule, SoftwareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
