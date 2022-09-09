import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatDTO } from './cat.dto';
import { Cat } from './cat.model';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(): Promise<Cat[]> {
    console.log("in get cats");
    return this.catsService.getCats();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    console.log("id::",id);
    return this.catsService.getCat(id);
  }

  @Post('new')
  async newCat(@Body() cat: CatDTO): Promise<Cat> {
    return this.catsService.addCat(cat);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.removeCat(id);
  }

  @Get('all/admin')
  async getAllCatWithAdminCat(){
    try{
      return this.catsService.getAllCatWithAdminCat();
    }catch(error){
      console.log("error::",error);
      return;
    }
    
  }
}
