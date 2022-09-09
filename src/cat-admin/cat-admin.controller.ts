import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CatAdminDTO } from './cat-admin.dto';
import { catAdmin } from './cat-admin.model';
import { CatAdminService } from './cat-admin.service';

@Controller('cat-admin')
export class CatAdminController {
    constructor(private readonly CatAdminService: CatAdminService) { }

    @Get()
    async getCatAdmins(): Promise<catAdmin[]> {
        return this.CatAdminService.getCatAdmins();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<catAdmin> {
        return this.CatAdminService.getCatAdmin(id);
    }

      @Post('new')
      async newCatAdmin(@Body() catAdmin: CatAdminDTO): Promise<catAdmin> {
        return this.CatAdminService.addCatAdmin(catAdmin);
      }

      @Delete(':id')
      async remove(@Param('id') id: string): Promise<void> {
        return this.CatAdminService.removeCatAdmin(id);
      }
}
