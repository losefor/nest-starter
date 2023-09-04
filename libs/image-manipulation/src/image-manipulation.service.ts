import { Injectable } from '@nestjs/common';
import sharp = require('sharp');

interface Options {
  reduceSize?: number;
  format?: 'webp' | 'png';
  quality?: number;
  width?: number;
  height?: number;
}

@Injectable()
export class ImageManipulationService {
  async toWebp(image: any): Promise<sharp.Sharp> {
    return sharp(image, { failOn: 'none' }).toFormat('webp').webp();
  }

  async toThumbnail(image: any, options?: Options): Promise<sharp.Sharp> {
    const metaData = await sharp(image).metadata();

    return sharp(image)
      .resize(
        options.reduceSize
          ? Math.floor(metaData.width * options.reduceSize)
          : options.width,
      )
      .toFormat('webp')
      .webp({
        quality: options.quality || 100,
      });
  }
}
