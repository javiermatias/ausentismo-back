import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('excel')
export class ExcelController {
    constructor(private readonly excelService: ExcelService){}

    @Public()
    @Get()
    getHello(): string {
      return "this.appService.getHello()";
    }
    @Public()
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async UploadExcelFile(@UploadedFile() file: Express.Multer.File) {
        console.log('upload');
       try{
        return this.excelService.processFile(file);
       }catch(exception){
        return "Error occurs";
       }
      
    }
}
