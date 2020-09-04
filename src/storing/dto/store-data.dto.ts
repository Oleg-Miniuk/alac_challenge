import { IsString, IsNotEmpty } from 'class-validator';

export class StoreDataDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly encryption_key: string;

  @IsNotEmpty()
  readonly value: any;
}
