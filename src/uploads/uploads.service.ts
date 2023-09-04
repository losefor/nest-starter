import { Injectable } from '@nestjs/common';
import aws = require('aws-sdk');

const spacesEndpoint = new aws.Endpoint(process.env.SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  region: 'tareky',
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
});

@Injectable()
export class UploadsService {
  /**
   *
   * @param image
   * @returns Promise
   */
  _uploadImagesToS3 = async (
    imageKey: string,
    imageBuffer: Buffer,
    contentType: string,
  ) => {
    const options = {
      Key: imageKey,
      Body: imageBuffer,
      Bucket: process.env.SPACES_BUCKET_NAME,
      ACL: 'public-read',
      ContentType: contentType,
    };

    return s3.upload(options).promise();
  };
}
