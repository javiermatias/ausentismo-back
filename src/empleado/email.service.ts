import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { Incidencia } from './entities/incidencia.entity';
import { IncidenciaNo } from './entities/incidenciaNo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/entities/role.entity';
import { ERole } from 'src/auth/role.enum';

@Injectable()
export class EmailService {
  constructor(
    private readonly sendGrid: SendGridService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async sendEmailIncidencia(
    sender: string,
    incidencia: Incidencia,
  ): Promise<void> {
    try {
      const htmlContent = this.generateHtml(incidencia);
      await this.sendGrid.send({
        to: sender,
        from: 'ausentismo@smartsoftsms.online',
        subject: `Ausencia de ${incidencia.nombre}`,
        text: 'Resumen de Incidencia',
        html: htmlContent,
      });
    } catch (error) {
      console.log(error.response.body);
    }
  }

  async sendEmailIncidenciaNo(
    sender: string,
    incidencia: IncidenciaNo,
  ): Promise<void> {
    try {
      const htmlContent = this.generateHtmlIncidenciaNo(incidencia);
      await this.sendGrid.send({
        to: sender,
        from: 'ausentismo@smartsoftsms.online',
        subject: `Ausencia de ${incidencia.nombre}`,
        text: 'Resumen de Incidencia',
        html: htmlContent,
      });
    } catch (error) {
      console.log(error.response.body);
    }
  }

  private generateHtml(incidencia: Incidencia): string {
    const htmlContent = `
    <h1>Resumen de Incidencia</h1>
    <p>Nombre: ${incidencia.nombre}</p>
    <p>Email: ${incidencia.email}</p>
    <p>Legajo: ${incidencia?.legajo}</p>
    <p>Celular: ${incidencia.celular}</p>
    <p>Enfermedad: ${incidencia.enfermedad}</p>
    <p>Síntomas: ${incidencia.sintomas}</p>
    <p>Medicación: ${incidencia.medicacion}</p>
    <p>Asistencia: ${incidencia.asistencia ? 'Sí' : 'No'}</p>
    <p>Certificado: ${incidencia.certificado ? 'Sí' : 'No'}</p>    
    <img src="${incidencia.urlImagen}" alt="${incidencia.nombreImagen}" />
  `;

    return htmlContent;
  }

  private generateHtmlIncidenciaNo(incidencia: IncidenciaNo): string {
    const htmlContent = `
    <h1>Resumen de Incidencia</h1>
    <p>Nombre: ${incidencia.nombre}</p>
    <p>Email: ${incidencia.email}</p>
    <p>Legajo: ${incidencia?.legajo}</p>
    <p>Celular: ${incidencia.celular}</p>
    <p>Certificado: ${incidencia.certificado ? 'Sí' : 'No'}</p>    
    <img src="${incidencia.urlImagen}" alt="${incidencia.nombreImagen}" />
  `;

    return htmlContent;
  }

  async searchRRHH(idEmpresa: number): Promise<User[]> {
    const role = await this.roleRepository.findOne({
      where: { roleName: ERole.Supervisor },
    });
    const usersInRoleAndCompany = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .innerJoinAndSelect('user.empresa', 'empresa')
      .where('role.id = :roleId', { roleId: role.id })
      .andWhere('empresa.id = :companyId', { companyId: idEmpresa })
      .getMany();

    return usersInRoleAndCompany;
  }
}
