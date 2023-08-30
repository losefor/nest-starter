import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string = 'super';

  @IsNotEmpty()
  @IsString()
  readonly password: string = 'super123';
}
