import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateRequestDto {
  userId: string;
  companyId: string;
  product: string;
  brand: string;
  model?: string;
  condition: string;
}

@Injectable()
export class ServiceRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRequestDto) {
    return this.prisma.serviceRequest.create({ data });
  }

  async findByUser(userId: string) {
    return this.prisma.serviceRequest.findMany({
      where: { userId },
      include: { company: { select: { id: true, name: true, specialty: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCompany(companyId: string) {
    return this.prisma.serviceRequest.findMany({
      where: { companyId },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.serviceRequest.update({ where: { id }, data: { status } });
  }
}
