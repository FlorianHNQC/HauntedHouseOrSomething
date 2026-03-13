import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommunauteService } from './communaute.service';
import { ArticleEchange } from './entities/communaute.entity';

describe('CommunauteService (Tests Unitaires)', () => {
  let service: CommunauteService;

  const mockArticleRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((article) => 
      Promise.resolve({ 
        id: 'uuid-1234-5678', 
        ...article, 
        statut: 'EN_ATTENTE_MODERATION', 
        dateCreation: new Date() 
      })
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        CommunauteService,
        {
          provide: getRepositoryToken(ArticleEchange),
          useValue: mockArticleRepository, // On injecte notre mock au lieu de la vraie DB
        },
      ],
    }).compile();

    service = module.get<CommunauteService>(CommunauteService);
  });

  it('doit être défini', () => {
    expect(service).toBeDefined();
  });

  it('doit créer un article d\'échange avec succès', async () => {
    // 1. Préparation des données entrantes (Arrange)
    const dto = { titre: 'Figurine Horreur', description: 'Édition limitée 1990' };
    const userId = 'user-auth-001';

    // 2. Exécution de la méthode (Act)
    const resultat = await service.create(dto, userId);

    // 3. Vérifications (Assert)
    expect(resultat).toEqual({
      id: 'uuid-1234-5678',
      titre: 'Figurine Horreur',
      description: 'Édition limitée 1990',
      userId: 'user-auth-001',
      statut: 'EN_ATTENTE_MODERATION',
      dateCreation: expect.any(Date),
    });
    
    expect(mockArticleRepository.create).toHaveBeenCalledWith({ ...dto, userId });
    expect(mockArticleRepository.save).toHaveBeenCalled();
  });
});