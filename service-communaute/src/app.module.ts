import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakModule } from '@slickteam/nestjs-keycloak';
import { CommunauteModule } from './communaute/communaute.module';
import { ArticleEchange } from './communaute/entities/communaute.entity';

@Module({
  imports:[
    // 1. Initialisation des variables d'environnement (accessible globalement)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2. Connexion à la Base de Données PostgreSQL via les variables d'environnement
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10), // <-- La correction est ici
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'password123',
      database: process.env.DB_NAME || 'epouvante_db',
      entities: [ArticleEchange],
      synchronize: true, // Auto-génération du schéma (réservé au périmètre du POC)
    }),

    // 3. Importation du serveur d'authentification Keycloak
    KeycloakModule,

    // 4. Importation du module métier
    CommunauteModule,
  ],
})
export class AppModule {}