import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestApisService } from './rest-apis.service';
import { CreateRestApiDto } from './dto/create-rest-api.dto';
import { UpdateRestApiDto } from './dto/update-rest-api.dto';

@Controller()
export class RestApisController {
  constructor(private readonly restApisService: RestApisService) {}

  @Post()
  create(@Body() createRestApiDto: CreateRestApiDto) {
    return this.restApisService.create(createRestApiDto);
  }

  @Get('allSubscribers')
  findAll() {
    return this.restApisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restApisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestApiDto: UpdateRestApiDto) {
    return this.restApisService.update(+id, updateRestApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restApisService.remove(+id);
  }
}
