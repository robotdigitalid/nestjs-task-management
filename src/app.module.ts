import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev',
      password: 'dev',
      database: 'data',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
