import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Post()
  create(@Body() body: CreateCompanyDto) {
    return this.companiesService.create(body);
  }
}
