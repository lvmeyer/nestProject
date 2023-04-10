import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'user',
      password: 'user',
      database: 'app',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CatsModule,
  ],
})
export class AppModule {}
