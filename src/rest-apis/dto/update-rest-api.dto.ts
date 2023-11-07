import { PartialType } from '@nestjs/swagger';
import { CreateRestApiDto } from './create-rest-api.dto';

export class UpdateRestApiDto extends PartialType(CreateRestApiDto) {}
