import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserDto } from 'src/empleado/dto/auth.user.dto';

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
    async UploadExcelFile(@UploadedFile() file: Express.Multer.File,
    @Req() req: Request) {
        const user: UserDto = req['user'];
       try{
        return this.excelService.processFile(file, user.empresaId);
       }catch(exception){
        return "Error occurs";
       }
      
    }
}
