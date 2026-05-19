import { IsEmail, IsNotEmpty, IsString, MinLength, IsDateString, IsOptional } from 'class-validator';

export class RegisterEmpleadoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es requerido' })
  nombre_completo!: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email_corporativo!: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsNotEmpty({ message: 'El cargo es requerido' })
  cargo!: string;

  @IsString()
  @IsNotEmpty({ message: 'El departamento es requerido' })
  departamento!: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsDateString({}, { message: 'Debe ser una fecha válida (YYYY-MM-DD)' })
  @IsOptional()
  fecha_nacimiento?: string;
}
