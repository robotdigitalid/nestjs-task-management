import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './entities/task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: 'id',
  username: 'username',
  password: 'password',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockRepository },
      ],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('should call tasksRepository.getTasks and return a result', async function () {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('should call tasksRepository.getTasks and return a result', async function () {
      const mockTask = {
        id: 'id',
        title: 'title',
        description: 'description',
        status: TaskStatus.OPEN,
      };
      expect(tasksRepository.findOne).not.toHaveBeenCalled();
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('id', mockUser);
      expect(tasksRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
    it('should call tasksRepository.getTasks and handle an error', async function () {
      tasksRepository.findOne.mockResolvedValue(null);
      await expect(tasksService.getTaskById('id', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
