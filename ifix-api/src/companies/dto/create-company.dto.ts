import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  @MaxLength(100)
  name!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @IsString()
  @Matches(/^\d{14}$/, { message: 'CNPJ deve ter 14 dígitos numéricos' })
  cnpj!: string;

  @IsString()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password!: string;

  @IsString()
  specialty?: string;
}
