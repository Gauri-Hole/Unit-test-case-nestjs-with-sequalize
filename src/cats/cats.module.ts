import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatsController } from './cats.controller';
import { Cat } from './cat.model';
import { CatsService } from './cats.service';
import { catAdmin } from '../cat-admin/cat-admin.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cat]),
    SequelizeModule.forFeature([catAdmin]),
],
  controllers: [CatsController],
  providers: [CatsService],
  
})
export class CatsModule {}
