import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ImageManipulationModule } from '@app/image-manipulation';

@Module({
  imports: [ImageManipulationModule],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
