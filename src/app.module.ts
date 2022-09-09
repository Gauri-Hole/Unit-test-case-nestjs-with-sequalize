import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatAdminModule } from './cat-admin/cat-admin.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'iauro100',
      database: 'iauro',
      synchronize: true,
      autoLoadModels: true,
    }),
    CatsModule,
    CatAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
