import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Get,
  Query,
  Header,
  Res,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageManipulationService } from '@app/image-manipulation/image-manipulation.service';
import { v4 as uuid } from 'uuid';
import { ProcessImageDto } from './dto/process-image.dto';
import { Response } from 'express';
import { UploadsService } from './uploads.service';
import { ApplyVersionHeader } from 'src/common/decorators/apply-version-header.decorator';

@ApplyVersionHeader()
@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly imageManipulation: ImageManipulationService,
    private readonly uploadService: UploadsService,
  ) {}

  @ApiBearerAuth()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 1 }]))
  @Post('images')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @UploadedFiles()
    files: {
      images: Express.Multer.File[];
    },
  ) {
    if (files.images.length === 0) {
      throw new BadRequestException();
    }

    const image = files.images[0];
    const generatedUUID = uuid();

    const webpImage = await this.imageManipulation.toWebp(image.buffer);

    const data = await this.uploadService._uploadImagesToS3(
      `${generatedUUID}`,
      await webpImage.toBuffer(),
      'image/webp',
    );

    return {
      data: data.Location,
    };
  }

  @Get('images')
  @Header('content-type', 'image/webp')
  async processImage(
    @Query() processImageDto: ProcessImageDto,
    @Res() res: Response,
  ) {
    const processedImage = await this.imageManipulation.toThumbnail(
      processImageDto.image,
      {
        quality: processImageDto.q,
        width: processImageDto.w,
      },
    );

    const buffer = await processedImage.toBuffer();

    return res.status(200).contentType('image/webp').send(buffer);
  }
}
