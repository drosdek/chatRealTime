import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O campo username deve ser uma string' })
  @IsNotEmpty({ message: 'O campo username é obrigatório' })
  username: string;

  @IsEmail({}, { message: 'O campo email deve ser um e-mail válido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  password: string;
}
