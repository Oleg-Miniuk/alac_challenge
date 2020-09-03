import { IsString, IsNotEmpty } from 'class-validator';

export class GetDataDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly decryption_key: number;
}
