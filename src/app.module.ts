import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import config from 'src/common/configs/config';
import { loggingMiddleware } from 'src/common/middleware/logging.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { DocumentsModule } from './documents/documents.module';
import { MediasModule } from './medias/medias.module';
import { KycAgencyModule } from './kyc-agency/kyc-agency.module';
import { ShareholdingModule } from './shareholding/shareholding.module';
import { ProjectEnrolledModule } from './project-enrolled/project-enrolled.module';
import { DscModule } from './dsc/dsc.module';
import { RestApisModule } from './rest-apis/rest-apis.module';
import { WalletManagementModule } from './wallet-management/wallet-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    AuthModule,
    UsersModule,
    DocumentsModule,
    MediasModule,
    KycAgencyModule,
    ShareholdingModule,
    ProjectEnrolledModule,
    DscModule,
    RestApisModule,
    WalletManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
