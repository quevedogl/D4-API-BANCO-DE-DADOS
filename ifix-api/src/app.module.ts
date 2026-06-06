import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    CompaniesModule,
    ServiceRequestsModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
