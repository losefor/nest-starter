import { Module } from '@nestjs/common';
import { ImageManipulationService } from './image-manipulation.service';

@Module({
  providers: [ImageManipulationService],
  exports: [ImageManipulationService],
})
export class ImageManipulationModule {}
