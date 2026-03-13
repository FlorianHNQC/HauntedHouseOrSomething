import { Controller, Post, Body, Req } from '@nestjs/common';
import { CommunauteService } from './communaute.service';
import { CreateArticleDto } from './dto/create-communaute.dto';

@Controller('api/echanges/articles')
export class CommunauteController {
  constructor(private readonly communauteService: CommunauteService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Req() request: any) {
    // Extraction sécurisée de l'identifiant utilisateur (standard OIDC)
    const userId = request.user?.sub || 'id-utilisateur-inconnu';
    return this.communauteService.create(createArticleDto, userId);
  }
}