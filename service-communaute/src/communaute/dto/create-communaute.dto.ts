import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  titre: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}