import { Module } from '@nestjs/common';
import { ServicesGateway } from './services.gateway';

@Module({
  providers: [ServicesGateway],
})
export class ServicesModule {}
