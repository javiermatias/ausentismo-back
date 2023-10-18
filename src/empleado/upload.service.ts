import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { uuid } from 'uuidv4';
import { iImagen } from './dto/imagen.interface';
@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID1'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRECT_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(originalName: string, file: Buffer): Promise<iImagen> {
    const fileName = `${uuid()}`;
    const encodeFileName = encodeURIComponent(fileName);
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    console.log(encodeFileName);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const file_upload = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'ausentismo',
        Key: encodeFileName,
        Body: file,
        ACL: 'public-read',
      }),
    );
    const image: iImagen = {
      nombreOriginal: originalName,
      nombreAws: encodeFileName,
      url: `https://${bucketName}.s3.amazonaws.com/${encodeFileName}`,
    };
    return image;
  }

  /* findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  } */
}
