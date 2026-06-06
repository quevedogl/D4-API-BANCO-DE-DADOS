import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('requests')
export class ServiceRequestsController {
  constructor(private readonly service: ServiceRequestsService) {}

  @Post()
  create(@Body() body: any, @Request() req: any) {
    return this.service.create({ ...body, userId: req.user.userId });
  }

  @Get('my')
  findMine(@Request() req: any) {
    return this.service.findByUser(req.user.userId);
  }

  @Get('company/:companyId')
  findByCompany(@Param('companyId') companyId: string) {
    return this.service.findByCompany(companyId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status);
  }
}
