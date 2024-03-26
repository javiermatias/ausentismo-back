import { Inject, Injectable} from '@nestjs/common';
import * as Excel from 'exceljs';
import { UsersService } from 'src/users/users.service';
import { CreateEmpleadoDto } from 'src/empleado/dto/create-empleado.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class ExcelService {

    constructor(
        @Inject(UsersService)
        private readonly userService: UsersService,
      ) { }
      async processFile(file: Express.Multer.File, empresaID:number) {
        try {
          const workBook = new Excel.Workbook();
          console.log(file.buffer);
          await workBook.xlsx.load(file.buffer);
    
          // Example: Read data from the first sheet
          const sheet = workBook.worksheets[0];
          //console.log(sheet.actualColumnCount);

           for (let rowIndex = 2; rowIndex <= sheet.rowCount; rowIndex++) {
        const row = sheet.getRow(rowIndex);
       
        // Assuming the columns are in the order: nombre, apellido, dni, email, empresaId
        const empleadoDto: CreateUserDto = {
            nombre: row.getCell(1).value.toLocaleString(),
            apellido: row.getCell(2).value.toLocaleString(),
            dni: parseInt(row.getCell(3).value.toLocaleString()),
            email: row.getCell(4).value?.toLocaleString() || undefined,
            empresaId: empresaID,
            rol:"empleado"
        };
        
        await this.userService.create(empleadoDto);
        //empleadoDtos.push(empleadoDto);
    }
       


          const empleadoDto:CreateEmpleadoDto ={
            nombre : 'John',
            apellido:'Doe',
            dni:123456789,
            email:'john.doe@example.com',
            empresaId:1
          }
          //empleadoDto.
       
      
          return empleadoDto; // Return the created object



          const cellValue = sheet.getRow(1).getCell(1).value;
          //console.log(cellValue);
          return cellValue;
        } catch (error) {
          // Handle errors here
          console.error('Error processing Excel file:', error);
          throw new Error('Error processing Excel file');
        }
      }
    
    





}




@Injectable()
export class FileParserService {
  async processFile(file: Express.Multer.File) {
    try {
      const workBook = new Excel.Workbook();
      await workBook.xlsx.load(file.buffer);

      // Example: Read data from the first sheet
      const sheet = workBook.getWorksheet('Sheet1');
      const cellValue = sheet.getRow(0).getCell(1).value;

      return cellValue;
    } catch (error) {
      // Handle errors here
      console.error('Error processing Excel file:', error);
      throw new Error('Error processing Excel file');
    }
  }
}