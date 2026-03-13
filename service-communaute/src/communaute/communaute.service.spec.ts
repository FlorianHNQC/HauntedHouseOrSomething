import { Test, TestingModule } from '@nestjs/testing';
import { CommunauteService } from './communaute.service';

describe('CommunauteService', () => {
  let service: CommunauteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunauteService],
    }).compile();

    service = module.get<CommunauteService>(CommunauteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
