import { Test, TestingModule } from '@nestjs/testing';
import { ImageManipulationService } from './image-manipulation.service';

describe('ImageManipulationService', () => {
  let service: ImageManipulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageManipulationService],
    }).compile();

    service = module.get<ImageManipulationService>(ImageManipulationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
