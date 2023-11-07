import { Test, TestingModule } from '@nestjs/testing';
import { RestApisController } from './rest-apis.controller';
import { RestApisService } from './rest-apis.service';

describe('RestApisController', () => {
  let controller: RestApisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestApisController],
      providers: [RestApisService],
    }).compile();

    controller = module.get<RestApisController>(RestApisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
