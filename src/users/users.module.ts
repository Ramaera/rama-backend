import { Module} from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [],
  providers: [UsersResolver, UsersService, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}
