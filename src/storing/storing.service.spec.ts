import { Test, TestingModule } from '@nestjs/testing';
import { StoringService } from './storing.service';

describe('StoringService', () => {
  let service: StoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoringService],
    }).compile();

    service = module.get<StoringService>(StoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
