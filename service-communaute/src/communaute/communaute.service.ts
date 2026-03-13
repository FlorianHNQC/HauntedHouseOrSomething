import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-communaute.dto';
import { ArticleEchange } from './entities/communaute.entity';

@Injectable()
export class CommunauteService {
  private readonly logger = new Logger(CommunauteService.name);

  constructor(
    @InjectRepository(ArticleEchange)
    private articleRepository: Repository<ArticleEchange>,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: string): Promise<ArticleEchange> {
    this.logger.log(`Création d'un nouvel article initiée par l'utilisateur: ${userId}`);
    
    const nouvelArticle = this.articleRepository.create({
      ...createArticleDto,
      userId,
    });

    const articleSauvegarde = await this.articleRepository.save(nouvelArticle);
    
    this.logger.log(`Article persisté avec succès sous l'ID: ${articleSauvegarde.id}`);
    return articleSauvegarde;
  }
}