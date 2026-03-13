import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('articles_echange')
export class ArticleEchange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  titre: string;

  @Column('text')
  description: string;

  @Column({ default: 'EN_ATTENTE_MODERATION' })
  statut: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  dateCreation: Date;
}