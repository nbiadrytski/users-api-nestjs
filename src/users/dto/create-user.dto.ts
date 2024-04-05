import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export type Roles = 'INTERN' | 'ENGINEER' | 'ADMIN';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: Roles;
}
