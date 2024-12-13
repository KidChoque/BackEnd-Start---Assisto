import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

//TaskController é referenciado no 
//TaskModule que é referenciado no app module e viabiliza o reconhecimento dessa controler
@Module({
    controllers: [TaskController],
    //Provider é o que permite o uso da service no construtor da controller
    providers: [TaskService]
})
export class TaskModule {}
