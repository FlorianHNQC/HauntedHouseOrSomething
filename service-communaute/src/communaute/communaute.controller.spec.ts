import { Test, TestingModule } from '@nestjs/testing';
import { CommunauteController } from './communaute.controller';
import { CommunauteService } from './communaute.service';

describe('CommunauteController', () => {
  let controller: CommunauteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunauteController],
      providers: [CommunauteService],
    }).compile();

    controller = module.get<CommunauteController>(CommunauteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
