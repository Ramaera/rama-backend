import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  StreamableFile,
  Headers,
  UploadedFiles,
  Request,
  Param,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import Express from 'express';

import 'multer';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ApiBody, ApiTags } from '@nestjs/swagger';

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);

  const randomName =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  callback(null, `${randomName}${fileExtName}`);
};

function processFilename(filename) {
  // Check if there is a dot (.) in the filename

  if (filename.includes('.')) {
    // Split the filename into two parts: the part before the last dot and the part after
    const [name, extension] = filename.split('.');

    // Check if the part after the last dot is one of the allowed extensions
    const allowedExtensions = ['.jpg', '.jpeg', '.jfif', 'bmp'];
    if (!allowedExtensions.includes(extension.toLowerCase())) {
      // If not, replace it with '.jpg'
      filename = `${name}.jpg`;
    }
  } else {
    // If there is no dot, add '.jpg' to the filename
    filename = `${filename}.jpg`;
  }
  console.log(filename);

  return filename;
}

export const imageFileFilter = (req, file, callback) => {
  console.log('filename', file.originalname);

  if (!processFilename(file.originalname).match(/\.(jpg|jpeg|png|jfif|bmp)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('documents')
export class MediasController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 1024 * 1024 * 20, // 20MB file size limit
      },
    })
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadSingle(@UploadedFile() file, @Headers() header) {
    const origin = header.host;
    const url = `https://${origin}/documents/${file.filename}`;

    const response = {
      originalname: processFilename(file.originalname),
      filename: file.filename,
      url,
    };
    return response;
  }
  @Get(':name')
  getFile(@Param() params): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), `uploads/${params.name}`)
    );
    return new StreamableFile(file);
  }
}
