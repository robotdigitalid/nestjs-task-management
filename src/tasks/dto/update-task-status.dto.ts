import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/tasks/entities/task.entity';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
