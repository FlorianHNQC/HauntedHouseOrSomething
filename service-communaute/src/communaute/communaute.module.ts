import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunauteService } from './communaute.service';
import { CommunauteController } from './communaute.controller';
import { ArticleEchange } from './entities/communaute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEchange])],
  controllers: [CommunauteController],
  providers: [CommunauteService],
})
export class CommunauteModule {}