import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.company.findMany({
      select: { id: true, name: true, email: true, cnpj: true, specialty: true, rating: true, createdAt: true },
    });
  }

  async findById(id: string) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.company.findUnique({ where: { email } });
  }

  async create(data: CreateCompanyDto) {
    const emailExists = await this.findByEmail(data.email);
    if (emailExists) throw new ConflictException('E-mail já cadastrado');

    const cnpjExists = await this.prisma.company.findUnique({ where: { cnpj: data.cnpj } });
    if (cnpjExists) throw new ConflictException('CNPJ já cadastrado');

    const hashed = await bcrypt.hash(data.password, 10);
    const company = await this.prisma.company.create({
      data: { ...data, password: hashed },
    });

    return { id: company.id, name: company.name, email: company.email, cnpj: company.cnpj };
  }
}
