import { Test, TestingModule } from '@nestjs/testing';
import { StoringController } from './storing.controller';

describe('StoringController', () => {
  let controller: StoringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoringController],
    }).compile();

    controller = module.get<StoringController>(StoringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
