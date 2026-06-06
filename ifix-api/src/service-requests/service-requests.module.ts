import { Module } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { ServiceRequestsController } from './service-requests.controller';

@Module({
  providers: [ServiceRequestsService],
  controllers: [ServiceRequestsController],
  exports: [ServiceRequestsService],
})
export class ServiceRequestsModule {}
