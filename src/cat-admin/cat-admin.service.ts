import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CatAdminDTO } from './cat-admin.dto';
import { catAdmin } from './cat-admin.model';

@Injectable()
export class CatAdminService {

    constructor(@InjectModel(catAdmin) private readonly catAdminsRepo: typeof catAdmin) { }

    async getCatAdmins(): Promise<catAdmin[]> {
        return this.catAdminsRepo.findAll();
    }

    async getCatAdmin(id: string): Promise<catAdmin> {
        return this.catAdminsRepo.findOne({
          where: {
            id,
          },
        });
      }
    
      async addCatAdmin(catAdmin: CatAdminDTO): Promise<catAdmin> {
        return this.catAdminsRepo.create(catAdmin as any);
      }
    
      async removeCatAdmin(id: string): Promise<void> {
        const cat = await this.getCatAdmin(id);
        await cat.destroy();
      }
};