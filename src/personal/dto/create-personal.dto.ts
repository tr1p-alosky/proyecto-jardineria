import { IsEmail, IsNotEmpty, IsString, MinLength, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Role, Estado_laboral } from '@prisma/client';

export class CreatePersonalDto {
  @IsString()
  @IsOptional()
  id_empleado?: string; // Opcional: si no se proporciona, se genera automáticamente

  @IsString()
  @IsNotEmpty()
  nombre_completo!: string;

  @IsEmail({}, { message: 'El correo electrónico no es valido' })
  @IsNotEmpty()
  email_corporativo!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsNotEmpty()
  cargo!: string;

  @IsString()
  @IsNotEmpty()
  departamento!: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsDateString({}, { message: 'Debe ser una fecha valida (YYYY-MM-DD)' })
  @IsOptional()
  fecha_nacimiento?: string;

  @IsEnum(Estado_laboral)
  @IsOptional()
  estado_laboral?: Estado_laboral;
}