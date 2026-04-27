import { Controller, Get } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';


@Controller('social-network')
export class SocialNetworkController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @Get()
  findAll() {
    return this.socialNetworkService.getAllSocialNetwork();
  }

}
