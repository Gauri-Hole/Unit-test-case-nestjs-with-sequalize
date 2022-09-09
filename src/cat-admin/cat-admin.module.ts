import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatAdminController } from './cat-admin.controller';
import { catAdmin } from './cat-admin.model';
import { CatAdminService } from './cat-admin.service';

@Module({
    imports: [SequelizeModule.forFeature([catAdmin])],
    controllers: [CatAdminController],
    providers: [CatAdminService],
})
export class CatAdminModule {}

