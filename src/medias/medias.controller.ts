import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  StreamableFile,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('photos')
export class MediasController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  uploadSingle(@UploadedFile() file) {
    console.log(file);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    return response;
  }

  @Get(":name")
  getFile(@Param() params): StreamableFile {
    const file = createReadStream(join(process.cwd(), `uploads/${params.name}`));
    return new StreamableFile(file);
  }
}
