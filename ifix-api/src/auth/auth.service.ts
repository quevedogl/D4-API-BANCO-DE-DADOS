import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // Tenta como cliente primeiro
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new UnauthorizedException('Credenciais inválidas');

      const payload = { sub: user.id, email: user.email, role: 'client' };
      return {
        access_token: this.jwtService.sign(payload),
        role: 'client',
        user: { id: user.id, name: user.name, email: user.email },
      };
    }

    // Tenta como empresa
    const company = await this.companiesService.findByEmail(email);
    if (company) {
      const valid = await bcrypt.compare(password, company.password);
      if (!valid) throw new UnauthorizedException('Credenciais inválidas');

      const payload = { sub: company.id, email: company.email, role: 'company' };
      return {
        access_token: this.jwtService.sign(payload),
        role: 'company',
        user: { id: company.id, name: company.name, email: company.email },
      };
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }
}
