import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencia } from 'src/empleado/entities/incidencia.entity';
import { IncidenciaNo } from 'src/empleado/entities/incidenciaNo.entity';
import * as Excel from 'exceljs';
import { Repository } from 'typeorm';

@Injectable()
export class ExcelService {

    constructor(
        @InjectRepository(Incidencia)
        private incidenciaRepository: Repository<Incidencia>,
        @InjectRepository(IncidenciaNo)
        private incidenciaRepositoryNo: Repository<IncidenciaNo>
      ) { }
      async processFile(file: Express.Multer.File) {
        try {
          const workBook = new Excel.Workbook();
          console.log(file.buffer);
          await workBook.xlsx.load(file.buffer);
    
          // Example: Read data from the first sheet
          const sheet = workBook.getWorksheet('Sheet1');
          console.log(sheet.actualColumnCount);
          const cellValue = sheet.getRow(1).getCell(1).value;
          console.log(cellValue);
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