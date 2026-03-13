import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-communaute.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}