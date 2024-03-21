import { Injectable } from '@nestjs/common';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencia } from 'src/empleado/entities/incidencia.entity';
import { Repository } from 'typeorm';
import { IncidenciaNo } from 'src/empleado/entities/incidenciaNo.entity';
import { CounterDto } from './dto/counters.dto';

@Injectable()
export class EstadisticasService {

  constructor(
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
    @InjectRepository(IncidenciaNo)
    private incidenciaRepositoryNo: Repository<IncidenciaNo>,

  ) { }
  create(createEstadisticaDto: CreateEstadisticaDto) {
    return 'This action adds a new estadistica';
  }

  async findByMonth(year: Number, empresaId: Number) {
    const incidenciaAll = await this.incidenciaRepository.query(
      `
    SELECT 
    MONTH(createdAt) AS month,
    COUNT(*) AS quantity
    FROM 
    (
        SELECT inc.createdAt FROM incidencia inc INNER JOIN sucursal s ON inc.sucursalId = s.id where s.empresaId = ${empresaId} 
        UNION ALL
        SELECT inc_no.createdAt FROM incidencia_no inc_no INNER JOIN sucursal s ON inc_no.sucursalId = s.id where s.empresaId = ${empresaId} 
    ) AS combined_tables
    WHERE 
    YEAR(createdAt) = ${year} 
    GROUP BY 
    MONTH(createdAt)
    ORDER BY month;     
    `
    );

    const transformedData = incidenciaAll.map(item => ({
      mes: this.getMonthName(item.month),
      cantidad: parseInt(item.quantity),
    }));

    return transformedData;
    //return incidenciaAll;
  }

  async findByMonthIncidencia(year: Number, empresaId: Number) {
    const incidenciaAll = await this.incidenciaRepository.query(
      `
      SELECT MONTH(inc.createdAt) AS month, COUNT(*) AS quantity
      FROM incidencia inc INNER JOIN sucursal s ON inc.sucursalId = s.id where s.empresaId = ${empresaId} AND YEAR(inc.createdAt) = ${year} 
      GROUP BY MONTH(inc.createdAt)
      ORDER BY month;     
    `
    );

    const transformedData = incidenciaAll.map(item => ({
      mes: this.getMonthName(item.month),
      cantidad: parseInt(item.quantity),
    }));

    return transformedData;
    //return incidenciaAll;
  }

  async findByMonthIncidencia_no(year: Number, empresaId: Number) {
    const incidenciaAll = await this.incidenciaRepository.query(
      `
      SELECT MONTH(inc.createdAt) AS month, COUNT(*) AS quantity
      FROM incidencia_no inc INNER JOIN sucursal s ON inc.sucursalId = s.id where s.empresaId = ${empresaId} AND YEAR(inc.createdAt) = ${year} 
      GROUP BY MONTH(inc.createdAt)
      ORDER BY month;      
    `
    );

    const transformedData = incidenciaAll.map(item => ({
      mes: this.getMonthName(item.month),
      cantidad: parseInt(item.quantity),
    }));

    return transformedData;
    //return incidenciaAll;
  }
  async combineResultsMonths(year:number, empresaId:number) {
    const result1 = await this.findByMonthIncidencia(year, empresaId);
    const result2 = await this.findByMonthIncidencia_no(year, empresaId);
    const map = new Map();
    result1.forEach(inc => {
      map.set(inc.mes, {cantInc:inc.cantidad, cantIncNo:0})
    });

    //console.log(result);
    result2.forEach(incNo => {
      if(map.has(incNo.mes)){
         let m = map.get(incNo.mes)
         m.cantIncNo = incNo.cantidad;
         map.set(incNo.mes, m);  
      }else{
        map.set(incNo.mes, {cantInc:0, cantIncNo:incNo.cantidad})
      }
     
    });

    const result = Array.from(map).map(([name, value]) => ({ name, ...value }));
    return result;
  }




  async getCountIncByDayMonthYear(empresaId: Number): Promise<CounterDto> {
    //const query = ;
    //console.log(empresaId)
    const result = await this.incidenciaRepository.query(`
    SELECT 
    SUM(CASE WHEN DAY(inc.createdAt) = DAY(CURDATE()) THEN 1 ELSE 0 END) AS day,
    SUM(CASE WHEN WEEK(inc.createdAt) = WEEK(CURDATE()) THEN 1 ELSE 0 END) AS week,
    SUM(CASE WHEN MONTH(inc.createdAt) = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS month,
    COUNT(*) AS year
    FROM
    incidencia inc INNER JOIN sucursal s ON inc.sucursalId = s.id
    WHERE
    YEAR(inc.createdAt) = YEAR(CURDATE()) and s.empresaId = ${empresaId} ;
    `);
    //return result;
    //console.log(result);
   // Process the result to desired object format
    return result.map(row => ({
      day: row.day ? parseInt(row.day) : 0,
      week: row.week ? parseInt(row.week) : 0,
      month: row.month ? parseInt(row.month) : 0,
      year: row.year ? parseInt(row.year) : 0,
      
    })); 
  }

  async getCountIncNoByDayMonthYear(empresaId: Number): Promise<CounterDto> {
    //const query = ;
    //console.log(empresaId)
    const result = await this.incidenciaRepository.query(`
    SELECT 
    SUM(CASE WHEN DAY(inc.createdAt) = DAY(CURDATE()) THEN 1 ELSE 0 END) AS day,
    SUM(CASE WHEN WEEK(inc.createdAt) = WEEK(CURDATE()) THEN 1 ELSE 0 END) AS week,
    SUM(CASE WHEN MONTH(inc.createdAt) = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS month,
    COUNT(*) AS year
    FROM
    incidencia_no inc INNER JOIN sucursal s ON inc.sucursalId = s.id
    WHERE
    YEAR(inc.createdAt) = YEAR(CURDATE()) and s.empresaId = ${empresaId} ;
    `);
    //return result;
    //console.log(result);
   // Process the result to desired object format
    return result.map(row => ({
      day: row.day ? parseInt(row.day) : 0,
      week: row.week ? parseInt(row.week) : 0,
      month: row.month ? parseInt(row.month) : 0,
      year: row.year ? parseInt(row.year) : 0,
      
    })); 
  }

  async combineResults(empresaId): Promise<CounterDto> {
    const result1 = await this.getCountIncByDayMonthYear(empresaId);
    const result2 = await this.getCountIncNoByDayMonthYear(empresaId);
     console.log(result1);
     console.log(result2);
    // Combine the results
    const combinedResults = {
      day: result1[0].day + result2[0].day,
      week: result1[0].week + result2[0].week,
      month: result1[0].month + result2[0].month,
      year: result1[0].year + result2[0].year,
    };

    return combinedResults;
  }

  async countByMonth(month: string, empresaId: Number) {
     const incidencias = await this.countByMonthInc(month, empresaId);
     const incidencias_no = await this.countByMonthIncNo(month, empresaId);
     return {
      incidencias: incidencias.total,
      incidenciasNo: incidencias_no.total
    };  
  
  }


  async countByMonthControlIncNo(month: string, empresaId: Number) {
    const englishMonth = this.translateSpanishMonthToEnglish(month);
    console.log(englishMonth);
    const result = await this.incidenciaRepository.query(`
    SELECT control, COUNT(*) as count     
    FROM incidencia_no inc INNER JOIN sucursal s ON inc.sucursalId = s.id
    WHERE MONTHNAME(inc.createdAt) = '${englishMonth}' AND YEAR(inc.createdAt) = YEAR(NOW())  AND s.empresaId = ${empresaId}
    GROUP BY control;
    `)

    const convertedArray = result.map(item => {
      let name;
      switch (item.control) {
        case 'DOMICILIO':
          name = 'Domicilio';
          break;
        case 'CONSULTORIO':
          name = 'Consultorio';
          break;
        case 'NOCONTROL':
          name = 'No Control';
          break;
        default:
          name = item.control;
      }
      return { name, value: item.count };
    });

    return convertedArray;
  }
  async countByMonthControlInc(month: string, empresaId: Number) {
    const englishMonth = this.translateSpanishMonthToEnglish(month);
    console.log(englishMonth);
    const result = await this.incidenciaRepository.query(`
    SELECT control, COUNT(*) as count     
    FROM (
        SELECT control FROM incidencia inc INNER JOIN sucursal s ON inc.sucursalId = s.id WHERE MONTHNAME(inc.createdAt) = '${englishMonth}' AND YEAR(inc.createdAt) = YEAR(NOW())  AND s.empresaId = ${empresaId}
        UNION ALL
        SELECT control FROM incidencia_no inc_no INNER JOIN sucursal s ON inc_no.sucursalId = s.id WHERE MONTHNAME(inc_no.createdAt) = '${englishMonth}' AND YEAR(inc_no.createdAt) = YEAR(NOW()) AND s.empresaId = ${empresaId}
    ) combined_incidencias
    
    GROUP BY control;
    `)

    const convertedArray = result.map(item => {
      let name;
      switch (item.control) {
        case 'DOMICILIO':
          name = 'Domicilio';
          break;
        case 'CONSULTORIO':
          name = 'Consultorio';
          break;
        case 'NOCONTROL':
          name = 'No Control';
          break;
        default:
          name = item.control;
      }
      return { name, value: item.count };
    });

    return convertedArray;
  }

  async countByMonthInc(month: string, empresaId: Number) {
    const englishMonth = this.translateSpanishMonthToEnglish(month);
    console.log(englishMonth);
    const result = await this.incidenciaRepository.query(`
    SELECT COUNT(*) AS total
    FROM incidencia inc INNER JOIN sucursal s ON inc.sucursalId = s.id
    WHERE MONTHNAME(inc.createdAt) = '${englishMonth}' AND s.empresaId = ${empresaId};
    `)

    return result[0];
  }

  async countByMonthIncNo(month: string, empresaId: Number) {
    const englishMonth = this.translateSpanishMonthToEnglish(month);
    console.log(englishMonth);
    const result = await this.incidenciaRepository.query(`
    SELECT COUNT(*) AS total
    FROM incidencia_no inc INNER JOIN sucursal s ON inc.sucursalId = s.id
    WHERE MONTHNAME(inc.createdAt) = '${englishMonth}' AND s.empresaId = ${empresaId};
    `)

    return result[0];
  }



  findOne(id: number) {

    return `This action returns a #${id} estadistica`;
  }

  update(id: number, updateEstadisticaDto: UpdateEstadisticaDto) {
    return `This action updates a #${id} estadistica`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadistica`;
  }

  // Function to convert month numbers to month names
  private getMonthName(monthNumber: number): string {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthNumber - 1] || '';
  }



  translateSpanishMonthToEnglish(spanishMonth: string): string {
    const spanishToEnglishMap: { [key: string]: string } = {
        "Enero": "January", 
        "Febrero": "February", 
        "Marzo": "March", 
        "Abril": "April", 
        "Mayo": "May", 
        "Junio": "June",
        "Julio": "July", 
        "Agosto": "August", 
        "Septiembre": "September", 
        "Octubre": "October", 
        "Noviembre": "November", 
        "Diciembre": "December"
    };

    const capitalizedSpanishMonth = spanishMonth.charAt(0).toUpperCase() + spanishMonth.slice(1);
    const englishMonth = spanishToEnglishMap[capitalizedSpanishMonth];

    if (englishMonth) {
        return englishMonth;
    } else {
        throw new Error("Invalid Spanish month name");
    }
}
}
