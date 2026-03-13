import { Test, TestingModule } from '@nestjs/testing';
import { CommunauteController } from './communaute.controller';
import { CommunauteService } from './communaute.service';

describe('CommunauteController (Tests d\'Intégration)', () => {
  let controller: CommunauteController;
  let service: CommunauteService;

  // Création d'un Mock pour le Service (le Contrôleur ne doit pas exécuter le vrai Service)
  const mockCommunauteService = {
    create: jest.fn((dto, userId) => {
      return {
        id: 'uuid-9999',
        ...dto,
        userId,
        statut: 'EN_ATTENTE_MODERATION',
        dateCreation: new Date(),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:[CommunauteController],
      providers:[
        {
          provide: CommunauteService,
          useValue: mockCommunauteService,
        },
      ],
    }).compile();

    controller = module.get<CommunauteController>(CommunauteController);
    service = module.get<CommunauteService>(CommunauteService);
  });

  it('doit être défini', () => {
    expect(controller).toBeDefined();
  });

  it('doit extraire l\'ID utilisateur de la requête et appeler le service', async () => {
    const dto = { titre: 'Affiche', description: 'Affiche de film originale' };
    
    // On simule l'objet "Request" injecté par Keycloak
    const requestMock = {
      user: {
        sub: 'keycloak-user-uuid',
      },
    };

    const resultat = await controller.create(dto, requestMock);

    expect(resultat.userId).toEqual('keycloak-user-uuid');
    expect(service.create).toHaveBeenCalledWith(dto, 'keycloak-user-uuid');
  });
});