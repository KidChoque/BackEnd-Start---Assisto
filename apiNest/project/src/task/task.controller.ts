import { Controller, Body, Post, Get, Param, InternalServerErrorException, ParseIntPipe, NotFoundException, Delete, Put, Patch } from '@nestjs/common';
import { TaskDto, TaskStatus } from './task.dto';
import { TaskService } from './task.service';
import { throwError } from 'rxjs';
//define o endpoint na controller /task
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {

    }

    @Post()
    create(@Body() task: TaskDto) {
        this.taskService.create(task);

    }

    @Get()
    read() {
        return this.taskService.getTasks();
    }

    @Get('/:id')
    async getTaskByID(@Param('id', ParseIntPipe) id: number) {

        try {
            const task = await this.taskService.getTaskByID(id);
            console.log('Tarefa encontrada:', task);

            if (!task) {
                throw new NotFoundException(`Tarefa não encontrada para o ID ${id}`);
            }
            return task;

        } catch (error) {
            console.error('Erro em getTaskByID:', error);
            throw new InternalServerErrorException('Erro interno do servidor');
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        try {
            await this.taskService.deleteTask(id);
            console.log(`Task de id ${id} deletada com sucesso`);
        } catch (error) {
            throw new Error(error);

        }

    }

    @Put(':id')
    updateTask(@Param('id', ParseIntPipe) id: number,@Body() UpdatedTaskDto: TaskDto){
      return this.taskService.updateTask(id,UpdatedTaskDto);  
    }

    @Patch(':id')
    updateStatus(@Param('id', ParseIntPipe)id:number,@Body() UpdatedStatus: string){

        return this.taskService.updateStatus(id,UpdatedStatus)
    }



}
