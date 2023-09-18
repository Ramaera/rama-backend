import { Injectable } from '@nestjs/common';
import { CreateProjectEnrolledInput } from './dto/create-project-enrolled.input';
import { UpdateProjectEnrolledInput } from './dto/update-project-enrolled.input';

@Injectable()
export class ProjectEnrolledService {
  create(createProjectEnrolledInput: CreateProjectEnrolledInput) {
    return 'This action adds a new projectEnrolled';
  }

  findAll() {
    return `This action returns all projectEnrolled`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectEnrolled`;
  }

  update(id: number, updateProjectEnrolledInput: UpdateProjectEnrolledInput) {
    return `This action updates a #${id} projectEnrolled`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectEnrolled`;
  }
}
