import { IsString, IsEnum, IsDate, IsNotEmpty, IsInt } from '@nestjs/class-validator'
import { IsOptional } from 'class-validator';

export enum TaskStatus {
  AFAZER = "AFAZER",
  FEITO = "FEITO"
}


export class TaskDto {

  //ID é gerado automaticamente caso não seja fornecido
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string; 

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus; 

  @IsDate()
  dateCreation: Date = new Date();

  @IsDate() 
  dateUpdate: Date = new Date();
}
