import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactResponseDto } from './dto/contact-response.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService){}
  async getContact(): Promise<ContactResponseDto>{
    let contact = await this.prisma.contact.findFirst();
    if(!contact){
      throw new NotFoundException("Configuration de l'accueil non trouvée.");
    }
    return {
        id: Number(contact.id),
        phone:contact.phone,
        email:contact.email
    };
  }
}
