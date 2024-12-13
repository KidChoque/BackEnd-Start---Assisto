import { HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { ok } from 'assert';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];


  async create(task: TaskDto): Promise<TaskDto> {

    const taskExists = this.tasks.find(t => t.id === task.id);

    //Verifica o id da ultima task e faz autoincrement do id das proximas ,
    // caso seja a primeira o id será igual a 1
    const lastTask = this.tasks[this.tasks.length - 1];
    task.id = lastTask ? lastTask.id + 1 : 1

    if (taskExists) {
      throw new Error(`O id da task deve ser único. ID duplicado: ${task.id}`)
    }

    task.dateCreation = new Date();
    task.dateUpdate = new Date();


    this.tasks.push(task);
    console.log('Tarefa criada:', this.tasks);

    const reorderedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dateCreation: task.dateCreation,
      dateUpdate: task.dateUpdate
    };

    return reorderedTask;
  }


  getTasks(): TaskDto[] {
    return this.tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dateCreation: task.dateCreation,
      dateUpdate: task.dateUpdate
    }));
  }

  getTaskByID(id: number): TaskDto | undefined {
    console.log('Buscando tarefa por id:', id);
    const task = this.tasks.find(task => task.id === id);
    return task;
  }

  deleteTask(id: number): void {
    const task = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(task, 1)[0];
  }

  updateTask(id: number, updatedTask: TaskDto): TaskDto {
    const task = this.tasks.findIndex(task => task.id === id);
    const existingTask = this.tasks[task];
    updatedTask.dateCreation = existingTask.dateCreation;
    updatedTask.dateUpdate = new Date();

    if (!task) {
      
    }

    this.tasks[task] = updatedTask;
    return updatedTask;
  }

  updateStatus(id: number, updatedStatus: string): TaskDto | string {
    const task = this.tasks.find(task => task.id === id);
   
    task.status = updatedStatus as TaskDto['status'];
    

    task.dateUpdate = new Date();
    return task;
  }


}
